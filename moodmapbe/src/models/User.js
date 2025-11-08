const db = require('../config/db');

class User {
  static async create(userData) {
    const { name, email, password, phone, role = 'student' } = userData;
    const [result] = await db.query(
      'INSERT INTO users (name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)',
      [name, email, password, phone, role]
    );
    return result.insertId;
  }

  static async findByEmail(email) {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  static async findById(id) {
    const [rows] = await db.query(
      'SELECT id, name, email, phone, photo, role, avg_mood, created_at FROM users WHERE id = ?',
      [id]
    );
    return rows[0];
  }

  static async update(id, userData) {
    const { name, phone, photo } = userData;
    await db.query(
      'UPDATE users SET name = ?, phone = ?, photo = ? WHERE id = ?',
      [name, phone, photo, id]
    );
    return this.findById(id);
  }

  static async updateAvgMood(userId, avgMood) {
    await db.query('UPDATE users SET avg_mood = ? WHERE id = ?', [avgMood, userId]);
  }
}

module.exports = User;