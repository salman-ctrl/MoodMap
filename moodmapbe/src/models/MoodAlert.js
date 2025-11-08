const db = require('../config/db');

class MoodAlert {
  static async create(alertData) {
    const { user_id, alert_type, message } = alertData;
    const [result] = await db.query(
      'INSERT INTO mood_alerts (user_id, alert_type, message) VALUES (?, ?, ?)',
      [user_id, alert_type, message]
    );
    return result.insertId;
  }

  static async findByUserId(userId) {
    const [rows] = await db.query(
      'SELECT * FROM mood_alerts WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );
    return rows;
  }
}

module.exports = MoodAlert;