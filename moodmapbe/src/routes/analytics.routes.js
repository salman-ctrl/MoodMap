const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const { verifyToken } = require('../middleware/authMiddleware');

router.get('/dashboard', verifyToken, analyticsController.getDashboard);

module.exports = router;