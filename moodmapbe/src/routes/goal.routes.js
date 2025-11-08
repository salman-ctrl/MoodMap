const express = require('express');
const router = express.Router();
const goalController = require('../controllers/goalController');
const { verifyToken } = require('../middleware/authMiddleware');
const { goalValidation } = require('../middleware/validation');

router.post('/', verifyToken, goalValidation, goalController.createGoal);
router.get('/', verifyToken, goalController.getGoals);
router.put('/:id', verifyToken, goalValidation, goalController.updateGoal);
router.delete('/:id', verifyToken, goalController.deleteGoal);

module.exports = router;