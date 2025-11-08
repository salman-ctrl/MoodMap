const db = require('../config/db');

class MoodSummary {
  static async create(summaryData) {
    const { user_id, date, avg_mood_score, dominant_mood, entry_count } = summaryData;
    const [result] = await db.query(
      'INSERT INTO mood_summaries (user_id, date, avg_mood_score, dominant_mood, entry_count) VALUES (?, ?, ?, ?, ?)',
      [user_id, date, avg_mood_score, dominant_mood, entry_count]
    );
    return result.insertId;
  }

  static async findByUserIdAndDateRange(userId, startDate, endDate) {
    const [rows] = await db.query(
      'SELECT * FROM mood_summaries WHERE user_id = ? AND date BETWEEN ? AND ? ORDER BY date ASC',
      [userId, startDate, endDate]
    );
    return rows;
  }
}

module.exports = MoodSummary;