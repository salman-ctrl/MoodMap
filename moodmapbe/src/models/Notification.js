const db = require('../config/db');

class Notification {
  static async create(notificationData) {
    const { user_id, type, title, message } = notificationData;
    const [result] = await db.query(
      'INSERT INTO notifications (user_id, type, title, message) VALUES (?, ?, ?, ?)',
      [user_id, type, title, message]
    );
    return result.insertId;
  }

  static async findByUserId(userId, limit = 20) {
    const [rows] = await db.query(
      'SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT ?',
      [userId, limit]
    );
    return rows;
  }

  static async markAsRead(id) {
    await db.query('UPDATE notifications SET is_read = true WHERE id = ?', [id]);
  }

  static async getUnreadCount(userId) {
    const [rows] = await db.query(
      'SELECT COUNT(*) as count FROM notifications WHERE user_id = ? AND is_read = false',
      [userId]
    );
    return rows[0].count;
  }
}

module.exports = Notification;