const express = require('express');
const router = express.Router();
const { getProfile, createProfile, updateProfile } = require('../controllers/participantController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Every route here requires login AND the 'participant' role
router.use(protect, authorize('participant'));

router.get('/profile', getProfile);
router.post('/profile', createProfile);
router.put('/profile', updateProfile);

module.exports = router;