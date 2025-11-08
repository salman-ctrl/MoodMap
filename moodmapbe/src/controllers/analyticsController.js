const Journal = require('../models/Journal');
const Goal = require('../models/Goal');
const Consultation = require('../models/Consultation');
const analyticsService = require('../services/analyticsService');
const ApiResponse = require('../utils/response');

exports.getDashboard = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Get basic stats
    const totalJournals = await Journal.countByUserId(userId);
    const totalConsultations = await Consultation.countByStudentId(userId);
    const goals = await Goal.findByUserId(userId);
    
    // Get recent journals for mood calculation
    const recentJournals = await Journal.getRecentByUserId(userId, 7);
    
    // Calculate positive days
    const positiveDays = recentJournals.filter(j => 
      ['happy', 'excited'].includes(j.mood)
    ).length;

    // Calculate average mood
    const avgMood = await analyticsService.calculateAvgMood(userId);

    // Get mood trend
    const moodTrend = await analyticsService.getMoodTrend(userId, 7);

    const dashboardData = {
      totalJournals,
      positiveDays,
      totalConsultations,
      avgMood: avgMood.toFixed(1),
      goals: goals.length,
      moodTrend
    };

    ApiResponse.success(res, 'Dashboard data retrieved', dashboardData);
  } catch (error) {
    next(error);
  }
};