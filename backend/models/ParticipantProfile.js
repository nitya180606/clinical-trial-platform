const mongoose = require('mongoose');

const participantProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ['male', 'female', 'other'] },
  location: String,
  medicalConditions: [String],
  currentMedications: [String],
  labResults: [{
    testName: String,
    value: Number,
    unit: String,
    date: Date
  }],
  priorTreatments: [String],
  medicalRecordFiles: [{ fileName: String, fileUrl: String }]
});

module.exports = mongoose.model('ParticipantProfile', participantProfileSchema);