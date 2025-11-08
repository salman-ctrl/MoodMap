const express = require('express');
const router = express.Router();
const consultationController = require('../controllers/consultationController');
const { verifyToken } = require('../middleware/authMiddleware');
const { consultationValidation } = require('../middleware/validation');

router.post('/', verifyToken, consultationValidation, consultationController.createConsultation);
router.get('/', verifyToken, consultationController.getConsultations);
router.get('/upcoming', verifyToken, consultationController.getUpcomingConsultations);
router.put('/:id', verifyToken, consultationController.updateConsultation);

module.exports = router;