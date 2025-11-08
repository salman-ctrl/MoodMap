const db = require('../config/db');

class Consultation {
  static async create(consultationData) {
    const { student_id, counselor_id, date, time, session_type, notes } = consultationData;
    const [result] = await db.query(
      'INSERT INTO consultations (student_id, counselor_id, date, time, session_type, notes) VALUES (?, ?, ?, ?, ?, ?)',
      [student_id, counselor_id, date, time, session_type, notes]
    );
    return result.insertId;
  }

  static async findByStudentId(studentId) {
    const [rows] = await db.query(`
      SELECT c.*, u.name as counselor_name, co.specialty
      FROM consultations c
      JOIN users u ON c.counselor_id = u.id
      JOIN counselors co ON co.user_id = u.id
      WHERE c.student_id = ?
      ORDER BY c.date DESC, c.time DESC
    `, [studentId]);
    return rows;
  }

  static async findUpcoming(studentId) {
    const [rows] = await db.query(`
      SELECT c.*, u.name as counselor_name, co.specialty
      FROM consultations c
      JOIN users u ON c.counselor_id = u.id
      JOIN counselors co ON co.user_id = u.id
      WHERE c.student_id = ? AND c.date >= CURDATE() AND c.status != 'cancelled'
      ORDER BY c.date ASC, c.time ASC
    `, [studentId]);
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM consultations WHERE id = ?', [id]);
    return rows[0];
  }

  static async updateStatus(id, status) {
    await db.query('UPDATE consultations SET status = ? WHERE id = ?', [status, id]);
  }

  static async countByStudentId(studentId) {
    const [rows] = await db.query(
      'SELECT COUNT(*) as count FROM consultations WHERE student_id = ? AND status = "completed"',
      [studentId]
    );
    return rows[0].count;
  }
}

module.exports = Consultation;