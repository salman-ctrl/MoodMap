const express = require('express');
const router = express.Router();
const counselorController = require('../controllers/counselorController');
const { verifyToken } = require('../middleware/authMiddleware');

router.get('/', verifyToken, counselorController.getAllCounselors);
router.get('/:id', verifyToken, counselorController.getCounselorById);

module.exports = router;
