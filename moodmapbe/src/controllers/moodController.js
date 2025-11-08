const Journal = require('../models/Journal');
const MoodSummary = require('../models/MoodSummary');
const ApiResponse = require('../utils/response');
const { format, subDays } = require('date-fns');

exports.getMoodHeatmap = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { period = 'month' } = req.query;

    let days = 30;
    if (period === 'week') days = 7;
    if (period === 'semester') days = 120;

    const startDate = format(subDays(new Date(), days), 'yyyy-MM-dd');
    const endDate = format(new Date(), 'yyyy-MM-dd');

    const journals = await Journal.findByUserId(userId);
    
    // Group by date and calculate mood score
    const moodMap = {};
    journals.forEach(journal => {
      if (journal.entry_date >= startDate && journal.entry_date <= endDate) {
        const moodScore = getMoodScore(journal.mood);
        if (!moodMap[journal.entry_date]) {
          moodMap[journal.entry_date] = [];
        }
        moodMap[journal.entry_date].push(moodScore);
      }
    });

    // Calculate average for each day
    const heatmapData = Object.keys(moodMap).map(date => ({
      date,
      moodScore: Math.round(
        moodMap[date].reduce((a, b) => a + b, 0) / moodMap[date].length
      )
    }));

    ApiResponse.success(res, 'Mood heatmap retrieved', heatmapData);
  } catch (error) {
    next(error);
  }
};

exports.getMoodSummary = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { startDate, endDate } = req.query;

    const summaries = await MoodSummary.findByUserIdAndDateRange(
      userId,
      startDate,
      endDate
    );

    ApiResponse.success(res, 'Mood summary retrieved', summaries);
  } catch (error) {
    next(error);
  }
};

function getMoodScore(mood) {
  const scores = {
    happy: 9,
    excited: 8,
    neutral: 5,
    anxious: 3,
    sad: 2,
    stressed: 3
  };
  return scores[mood] || 5;
}