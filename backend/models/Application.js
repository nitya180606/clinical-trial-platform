const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  trial: { type: mongoose.Schema.Types.ObjectId, ref: 'Trial', required: true },
  participant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  matchStatus: { type: String, enum: ['eligible', 'not_eligible', 'needs_review'], required: true },
  matchDetails: [String],
  orgDecision: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  appliedAt: { type: Date, default: Date.now },
  participantResponse: {
  type: String,
  enum: ['pending', 'accepted', 'declined'],
  default: 'pending'
}
});

module.exports = mongoose.model('Application', applicationSchema);