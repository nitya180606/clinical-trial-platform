const OrganizationProfile = require('../models/OrganizationProfile');

// GET /api/organizations/profile (protected, organization only)
exports.getProfile = async (req, res) => {
  try {
    const profile = await OrganizationProfile.findOne({ user: req.user._id });

    if (!profile) {
      return res.status(404).json({ message: 'No profile found yet. Create one first.' });
    }

    res.status(200).json({ profile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong fetching the profile.' });
  }
};

// POST /api/organizations/profile (protected, organization only)
exports.createProfile = async (req, res) => {
  try {
    const existing = await OrganizationProfile.findOne({ user: req.user._id });
    if (existing) {
      return res.status(400).json({ message: 'Profile already exists. Use PUT to update it instead.' });
    }

    const { organizationName, registrationNumber, address } = req.body;

    if (!organizationName) {
      return res.status(400).json({ message: 'Organization name is required.' });
    }

    const profile = await OrganizationProfile.create({
      user: req.user._id,
      organizationName,
      registrationNumber,
      address
    });

    res.status(201).json({ profile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong creating the profile.' });
  }
};

// PUT /api/organizations/profile (protected, organization only)
exports.updateProfile = async (req, res) => {
  try {
    const profile = await OrganizationProfile.findOneAndUpdate(
      { user: req.user._id },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!profile) {
      return res.status(404).json({ message: 'No profile found yet. Create one first with POST.' });
    }

    res.status(200).json({ profile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong updating the profile.' });
  }
};