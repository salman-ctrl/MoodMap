const { body, param, validationResult } = require('express-validator');
const ApiResponse = require('../utils/response');
const { MOODS, SESSION_TYPES } = require('../utils/constants');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return ApiResponse.error(res, 'Validation failed', 400, errors.array());
  }
  next();
};

const registerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  body('phone').optional().isMobilePhone(),
  validate
];

const loginValidation = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
  validate
];

const journalValidation = [
  body('entry_date').isDate().withMessage('Valid date is required'),
  body('mood')
    .isIn(MOODS)
    .withMessage(`Mood must be one of: ${MOODS.join(', ')}`),
  body('content').trim().notEmpty().withMessage('Content is required'),
  validate
];

const goalValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('progress')
    .optional()
    .isInt({ min: 0, max: 100 })
    .withMessage('Progress must be between 0 and 100'),
  validate
];

const consultationValidation = [
  body('counselor_id').isInt().withMessage('Valid counselor ID required'),
  body('date').isDate().withMessage('Valid date is required'),
  body('time').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Valid time required (HH:MM)'),
  body('session_type')
    .isIn(SESSION_TYPES)
    .withMessage(`Session type must be: ${SESSION_TYPES.join(', ')}`),
  validate
];

module.exports = {
  registerValidation,
  loginValidation,
  journalValidation,
  goalValidation,
  consultationValidation,
  validate
};