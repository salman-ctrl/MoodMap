const express = require('express');
const router = express.Router();
const journalController = require('../controllers/journalController');
const { verifyToken } = require('../middleware/authMiddleware');
const { journalValidation } = require('../middleware/validation');

router.post('/', verifyToken, journalValidation, journalController.createJournal);
router.get('/', verifyToken, journalController.getJournals);
router.get('/:id', verifyToken, journalController.getJournalById);
router.put('/:id', verifyToken, journalValidation, journalController.updateJournal);
router.delete('/:id', verifyToken, journalController.deleteJournal);

module.exports = router;