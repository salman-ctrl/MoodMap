const db = require('../config/db');

class Journal {
  static async create(journalData) {
    const { user_id, entry_date, mood, content, sentiment_score } = journalData;
    const [result] = await db.query(
      'INSERT INTO journals (user_id, entry_date, mood, content, sentiment_score) VALUES (?, ?, ?, ?, ?)',
      [user_id, entry_date, mood, content, sentiment_score]
    );
    return result.insertId;
  }

  static async findByUserId(userId, limit = 50) {
    const [rows] = await db.query(
      'SELECT * FROM journals WHERE user_id = ? ORDER BY entry_date DESC LIMIT ?',
      [userId, limit]
    );
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM journals WHERE id = ?', [id]);
    return rows[0];
  }

  static async update(id, journalData) {
    const { entry_date, mood, content, sentiment_score } = journalData;
    await db.query(
      'UPDATE journals SET entry_date = ?, mood = ?, content = ?, sentiment_score = ? WHERE id = ?',
      [entry_date, mood, content, sentiment_score, id]
    );
    return this.findById(id);
  }

  static async delete(id) {
    await db.query('DELETE FROM journals WHERE id = ?', [id]);
  }

  static async getRecentByUserId(userId, days = 7) {
    const [rows] = await db.query(
      `SELECT * FROM journals 
       WHERE user_id = ? AND entry_date >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
       ORDER BY entry_date DESC`,
      [userId, days]
    );
    return rows;
  }

  static async countByUserId(userId) {
    const [rows] = await db.query(
      'SELECT COUNT(*) as count FROM journals WHERE user_id = ?',
      [userId]
    );
    return rows[0].count;
  }
}

module.exports = Journal;