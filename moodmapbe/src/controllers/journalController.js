const Journal = require('../models/Journal');
const sentimentService = require('../services/sentimentService');
const alertService = require('../services/alertService');
const ApiResponse = require('../utils/response');

exports.createJournal = async (req, res, next) => {
  try {
    const { entry_date, mood, content } = req.body;
    const userId = req.user.id;

    // Analyze sentiment (optional, can be set to null for now)
    let sentimentScore = null;
    try {
      sentimentScore = await sentimentService.analyzeSentiment(content);
    } catch (err) {
      // Continue without sentiment if service is unavailable
    }

    const journalId = await Journal.create({
      user_id: userId,
      entry_date,
      mood,
      content,
      sentiment_score: sentimentScore
    });

    const journal = await Journal.findById(journalId);

    // Check for mood alerts
    await alertService.checkMoodAlerts(userId);

    ApiResponse.success(res, 'Journal entry created', journal, 201);
  } catch (error) {
    next(error);
  }
};

exports.getJournals = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const journals = await Journal.findByUserId(userId);
    ApiResponse.success(res, 'Journals retrieved', journals);
  } catch (error) {
    next(error);
  }
};

exports.getJournalById = async (req, res, next) => {
  try {
    const journal = await Journal.findById(req.params.id);
    if (!journal) {
      return ApiResponse.error(res, 'Journal not found', 404);
    }
    if (journal.user_id !== req.user.id) {
      return ApiResponse.error(res, 'Access denied', 403);
    }
    ApiResponse.success(res, 'Journal retrieved', journal);
  } catch (error) {
    next(error);
  }
};

exports.updateJournal = async (req, res, next) => {
  try {
    const { entry_date, mood, content } = req.body;
    const journal = await Journal.findById(req.params.id);

    if (!journal) {
      return ApiResponse.error(res, 'Journal not found', 404);
    }
    if (journal.user_id !== req.user.id) {
      return ApiResponse.error(res, 'Access denied', 403);
    }

    // Analyze sentiment
    let sentimentScore = null;
    try {
      sentimentScore = await sentimentService.analyzeSentiment(content);
    } catch (err) {
      // Continue without sentiment if service is unavailable
    }

    const updatedJournal = await Journal.update(req.params.id, {
      entry_date,
      mood,
      content,
      sentiment_score: sentimentScore
    });

    ApiResponse.success(res, 'Journal updated', updatedJournal);
  } catch (error) {
    next(error);
  }
};

exports.deleteJournal = async (req, res, next) => {
  try {
    const journal = await Journal.findById(req.params.id);
    if (!journal) {
      return ApiResponse.error(res, 'Journal not found', 404);
    }
    if (journal.user_id !== req.user.id) {
      return ApiResponse.error(res, 'Access denied', 403);
    }

    await Journal.delete(req.params.id);
    ApiResponse.success(res, 'Journal deleted');
  } catch (error) {
    next(error);
  }
};