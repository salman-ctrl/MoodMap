const Journal = require('../models/Journal');
const User = require('../models/User');

class AnalyticsService {
  async calculateAvgMood(userId) {
    try {
      const journals = await Journal.getRecentByUserId(userId, 30);
      
      if (journals.length === 0) return 0;
      
      const moodScores = {
        happy: 9,
        excited: 8,
        neutral: 5,
        anxious: 3,
        sad: 2,
        stressed: 3
      };
      
      const totalScore = journals.reduce((sum, journal) => {
        return sum + (moodScores[journal.mood] || 5);
      }, 0);
      
      const avgMood = totalScore / journals.length;
      
      // Update user's avg_mood
      await User.updateAvgMood(userId, avgMood);
      
      return avgMood;
    } catch (error) {
      console.error('Calculate avg mood failed:', error.message);
      return 0;
    }
  }

  async getMoodTrend(userId, days = 7) {
    try {
      const journals = await Journal.getRecentByUserId(userId, days);
      
      const moodScores = {
        happy: 9,
        excited: 8,
        neutral: 5,
        anxious: 3,
        sad: 2,
        stressed: 3
      };
      
      // Group by date
      const moodByDate = {};
      journals.forEach(journal => {
        const date = journal.entry_date;
        if (!moodByDate[date]) {
          moodByDate[date] = [];
        }
        moodByDate[date].push(moodScores[journal.mood] || 5);
      });
      
      // Calculate average for each day
      const trend = Object.keys(moodByDate).map(date => ({
        date,
        mood: (moodByDate[date].reduce((a, b) => a + b, 0) / moodByDate[date].length).toFixed(1)
      }));
      
      return trend.sort((a, b) => new Date(a.date) - new Date(b.date));
    } catch (error) {
      console.error('Get mood trend failed:', error.message);
      return [];
    }
  }

  async generateWeeklyInsights(userId) {
    try {
      const journals = await Journal.getRecentByUserId(userId, 7);
      
      const moodCounts = {};
      journals.forEach(journal => {
        moodCounts[journal.mood] = (moodCounts[journal.mood] || 0) + 1;
      });
      
      const dominantMood = Object.keys(moodCounts).reduce((a, b) => 
        moodCounts[a] > moodCounts[b] ? a : b
      );
      
      const avgMood = await this.calculateAvgMood(userId);
      
      return {
        totalEntries: journals.length,
        dominantMood,
        avgMood: avgMood.toFixed(1),
        moodDistribution: moodCounts
      };
    } catch (error) {
      console.error('Generate insights failed:', error.message);
      return null;
    }
  }
}

module.exports = new AnalyticsService();