const express = require('express');
const router = express.Router();
const moodController = require('../controllers/moodController');
const { verifyToken } = require('../middleware/authMiddleware');

router.get('/heatmap', verifyToken, moodController.getMoodHeatmap);
router.get('/summary', verifyToken, moodController.getMoodSummary);

module.exports = router;