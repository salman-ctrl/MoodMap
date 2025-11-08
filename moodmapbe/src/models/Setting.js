const db = require('../config/db');

class Setting {
  static async findByUserId(userId) {
    const [rows] = await db.query('SELECT * FROM settings WHERE user_id = ?', [userId]);
    return rows[0];
  }

  static async create(userId) {
    await db.query('INSERT INTO settings (user_id) VALUES (?)', [userId]);
    return this.findByUserId(userId);
  }

  static async update(userId, settingData) {
    const {
      share_with_counselor,
      anonymous_analytics,
      dark_mode,
      daily_reminder,
      session_reminder,
      weekly_insights
    } = settingData;

    await db.query(
      `UPDATE settings SET 
       share_with_counselor = ?, 
       anonymous_analytics = ?, 
       dark_mode = ?, 
       daily_reminder = ?, 
       session_reminder = ?, 
       weekly_insights = ? 
       WHERE user_id = ?`,
      [share_with_counselor, anonymous_analytics, dark_mode, daily_reminder, session_reminder, weekly_insights, userId]
    );
    return this.findByUserId(userId);
  }
}

module.exports = Setting;