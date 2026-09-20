const ParticipantProfile = require('../models/ParticipantProfile');

// GET /api/participants/profile (protected, participant only)
// Returns the logged-in participant's own profile
exports.getProfile = async (req, res) => {
  try {
    const profile = await ParticipantProfile.findOne({ user: req.user._id });

    if (!profile) {
      return res.status(404).json({ message: 'No profile found yet. Create one first.' });
    }

    res.status(200).json({ profile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong fetching the profile.' });
  }
};

// POST /api/participants/profile (protected, participant only)
// Creates the profile — one-time, right after signup
exports.createProfile = async (req, res) => {
  try {
    const existing = await ParticipantProfile.findOne({ user: req.user._id });
    if (existing) {
      return res.status(400).json({ message: 'Profile already exists. Use PUT to update it instead.' });
    }

    const {
      age, gender, location, medicalConditions,
      currentMedications, labResults, priorTreatments, medicalRecordFiles
    } = req.body;

    if (!age) {
      return res.status(400).json({ message: 'Age is required.' });
    }

    const profile = await ParticipantProfile.create({
      user: req.user._id,
      age,
      gender,
      location,
      medicalConditions,
      currentMedications,
      labResults,
      priorTreatments,
      medicalRecordFiles
    });

    res.status(201).json({ profile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong creating the profile.' });
  }
};

// PUT /api/participants/profile (protected, participant only)
// Updates the existing profile
exports.updateProfile = async (req, res) => {
  try {
    const profile = await ParticipantProfile.findOneAndUpdate(
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