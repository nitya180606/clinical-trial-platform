const express = require('express');
const router = express.Router();
const { getProfile, createProfile, updateProfile } = require('../controllers/organizationController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect, authorize('organization'));

router.get('/profile', getProfile);
router.post('/profile', createProfile);
router.put('/profile', updateProfile);

module.exports = router;