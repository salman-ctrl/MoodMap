const Journal = require('../models/Journal');
const MoodAlert = require('../models/MoodAlert');
const Notification = require('../models/Notification');
const { subDays, format } = require('date-fns');

class AlertService {
  async checkMoodAlerts(userId) {
    try {
      // Get last 3 days of journals
      const recentJournals = await Journal.getRecentByUserId(userId, 3);
      
      if (recentJournals.length >= 3) {
        const negativeMoods = ['sad', 'anxious', 'stressed'];
        const badMoodCount = recentJournals.filter(j => 
          negativeMoods.includes(j.mood)
        ).length;
        
        // If 3 consecutive bad mood days
        if (badMoodCount >= 3) {
          // Check if alert already sent
          const existingAlerts = await MoodAlert.findByUserId(userId);
          const recentAlert = existingAlerts.find(alert => {
            const alertDate = new Date(alert.created_at);
            const threeDaysAgo = subDays(new Date(), 3);
            return alertDate >= threeDaysAgo && alert.alert_type === '3_days_bad_mood';
          });
          
          if (!recentAlert) {
            // Create alert
            await MoodAlert.create({
              user_id: userId,
              alert_type: '3_days_bad_mood',
              message: 'You have been experiencing low mood for 3 consecutive days. Consider scheduling a consultation with a counselor.'
            });
            
            // Create notification
            await Notification.create({
              user_id: userId,
              type: 'alert',
              title: 'Mood Alert',
              message: 'We noticed you\'ve been feeling down lately. Would you like to talk to a counselor?'
            });
          }
        }
      }
    } catch (error) {
      console.error('Alert check failed:', error.message);
    }
  }

  async detectSevereDistress(userId, sentimentScore) {
    if (sentimentScore && sentimentScore < -0.7) {
      await MoodAlert.create({
        user_id: userId,
        alert_type: 'severe_distress',
        message: 'Severe emotional distress detected. Immediate support recommended.'
      });
      
      await Notification.create({
        user_id: userId,
        type: 'alert',
        title: 'Urgent: Support Available',
        message: 'We\'re here for you. Please consider reaching out to a counselor immediately.'
      });
    }
  }
}

module.exports = new AlertService();