const Consultation = require('../models/Consultation');
const Notification = require('../models/Notification');
const ApiResponse = require('../utils/response');

exports.createConsultation = async (req, res, next) => {
  try {
    const { counselor_id, date, time, session_type, notes } = req.body;
    const studentId = req.user.id;

    const consultationId = await Consultation.create({
      student_id: studentId,
      counselor_id,
      date,
      time,
      session_type,
      notes
    });

    // Create notification
    await Notification.create({
      user_id: studentId,
      type: 'consult',
      title: 'Consultation Booked',
      message: `Your consultation has been scheduled for ${date} at ${time}`
    });

    const consultation = await Consultation.findById(consultationId);
    ApiResponse.success(res, 'Consultation booked successfully', consultation, 201);
  } catch (error) {
    next(error);
  }
};

exports.getConsultations = async (req, res, next) => {
  try {
    const studentId = req.user.id;
    const consultations = await Consultation.findByStudentId(studentId);
    ApiResponse.success(res, 'Consultations retrieved', consultations);
  } catch (error) {
    next(error);
  }
};

exports.getUpcomingConsultations = async (req, res, next) => {
  try {
    const studentId = req.user.id;
    const consultations = await Consultation.findUpcoming(studentId);
    ApiResponse.success(res, 'Upcoming consultations retrieved', consultations);
  } catch (error) {
    next(error);
  }
};

exports.updateConsultation = async (req, res, next) => {
  try {
    const { status } = req.body;
    const consultation = await Consultation.findById(req.params.id);

    if (!consultation) {
      return ApiResponse.error(res, 'Consultation not found', 404);
    }
    if (consultation.student_id !== req.user.id) {
      return ApiResponse.error(res, 'Access denied', 403);
    }

    await Consultation.updateStatus(req.params.id, status);
    const updated = await Consultation.findById(req.params.id);
    
    ApiResponse.success(res, 'Consultation updated', updated);
  } catch (error) {
    next(error);
  }
};
