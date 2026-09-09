const mongoose = require('mongoose');

const trialSchema = new mongoose.Schema({
  organization: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: String,
  condition: { type: String, required: true },
  phase: String,
  location: String,
  status: { type: String, enum: ['open', 'closed'], default: 'open' },
  eligibilityCriteria: {
    minAge: Number,
    maxAge: Number,
    gender: { type: String, enum: ['male', 'female', 'any'], default: 'any' },
    requiredConditions: [String],
    excludedConditions: [String],
    excludedMedications: [String],
    labRequirements: [{
      testName: String,
      operator: { type: String, enum: ['<', '<=', '>', '>=', '='] },
      value: Number
    }]
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Trial', trialSchema);