const db = require('../config/db');

class Goal {
  static async create(goalData) {
    const { user_id, title, description, color, progress, parent_id } = goalData;
    const [result] = await db.query(
      'INSERT INTO goals (user_id, title, description, color, progress, parent_id) VALUES (?, ?, ?, ?, ?, ?)',
      [user_id, title, description, color, progress || 0, parent_id || null]
    );
    return result.insertId;
  }

  static async findByUserId(userId) {
    const [rows] = await db.query(
      'SELECT * FROM goals WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM goals WHERE id = ?', [id]);
    return rows[0];
  }

  static async update(id, goalData) {
    const { title, description, color, progress } = goalData;
    await db.query(
      'UPDATE goals SET title = ?, description = ?, color = ?, progress = ? WHERE id = ?',
      [title, description, color, progress, id]
    );
    return this.findById(id);
  }

  static async delete(id) {
    await db.query('DELETE FROM goals WHERE id = ?', [id]);
  }
}

module.exports = Goal;