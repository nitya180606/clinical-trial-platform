const Trial = require('../models/Trial');

// POST /api/trials (protected, organization only)
exports.createTrial = async (req, res) => {
  try {
    const {
      title, description, condition, phase, location, eligibilityCriteria
    } = req.body;

    if (!title || !condition) {
      return res.status(400).json({ message: 'Title and condition are required.' });
    }

    const trial = await Trial.create({
      organization: req.user._id,
      title,
      description,
      condition,
      phase,
      location,
      eligibilityCriteria
    });

    // TODO (Person 4): trigger the matching engine here, checking this
    // trial's eligibilityCriteria against all existing participant profiles.

    res.status(201).json({ trial });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong creating the trial.' });
  }
};

// GET /api/trials (protected — any logged-in user, participant or org)
// Supports optional filters: ?condition=...&location=...&phase=...
exports.getTrials = async (req, res) => {
  try {
    const filter = { status: 'open' };
    if (req.query.condition) filter.condition = req.query.condition;
    if (req.query.location) filter.location = req.query.location;
    if (req.query.phase) filter.phase = req.query.phase;

    const trials = await Trial.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ trials });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong fetching trials.' });
  }
};

// GET /api/trials/:id (protected)
exports.getTrialById = async (req, res) => {
  try {
    const trial = await Trial.findById(req.params.id);

    if (!trial) {
      return res.status(404).json({ message: 'Trial not found.' });
    }

    res.status(200).json({ trial });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong fetching the trial.' });
  }
};

// PUT /api/trials/:id (protected, organization only, owner-only)
exports.updateTrial = async (req, res) => {
  try {
    const trial = await Trial.findById(req.params.id);

    if (!trial) {
      return res.status(404).json({ message: 'Trial not found.' });
    }

    // Ownership check — only the org that created this trial can edit it
    if (trial.organization.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only edit your own trials.' });
    }

    Object.assign(trial, req.body);
    await trial.save();

    res.status(200).json({ trial });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong updating the trial.' });
  }
};

// GET /api/trials/:id/applications (protected, organization only, owner-only)
// Person 4 will build the Application model logic this depends on —
// left as a stub here so the route exists and returns something sane.
exports.getTrialApplications = async (req, res) => {
  try {
    const trial = await Trial.findById(req.params.id);

    if (!trial) {
      return res.status(404).json({ message: 'Trial not found.' });
    }

    if (trial.organization.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only view applications for your own trials.' });
    }

    const Application = require('../models/Application');
    const applications = await Application.find({ trial: trial._id })
      .populate('participant', 'name email');

    res.status(200).json({ applications });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong fetching applications.' });
  }
};