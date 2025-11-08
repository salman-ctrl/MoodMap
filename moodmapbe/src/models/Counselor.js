const db = require('../config/db');

class Counselor {
  static async getAll() {
    const [rows] = await db.query(`
      SELECT c.*, u.name, u.email, u.photo
      FROM counselors c
      JOIN users u ON c.user_id = u.id
      WHERE u.role = 'counselor'
      ORDER BY c.rating DESC
    `);
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.query(`
      SELECT c.*, u.name, u.email, u.photo
      FROM counselors c
      JOIN users u ON c.user_id = u.id
      WHERE c.id = ?
    `, [id]);
    return rows[0];
  }

  static async findByUserId(userId) {
    const [rows] = await db.query('SELECT * FROM counselors WHERE user_id = ?', [userId]);
    return rows[0];
  }

  static async updateAvailability(id, available) {
    await db.query('UPDATE counselors SET available = ? WHERE id = ?', [available, id]);
  }
}

module.exports = Counselor;