const express = require('express');
const router = express.Router();
const {
  createTrial, getTrials, getTrialById, updateTrial, getTrialApplications
} = require('../controllers/trialController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Any logged-in user (participant or organization) can browse trials
router.get('/', protect, getTrials);
router.get('/:id', protect, getTrialById);

// Organization-only actions
router.post('/', protect, authorize('organization'), createTrial);
router.put('/:id', protect, authorize('organization'), updateTrial);
router.get('/:id/applications', protect, authorize('organization'), getTrialApplications);

module.exports = router;