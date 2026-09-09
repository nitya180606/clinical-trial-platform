const mongoose = require('mongoose');

const orgProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  organizationName: { type: String, required: true },
  registrationNumber: String,
  address: String,
  verified: { type: Boolean, default: false }
});

module.exports = mongoose.model('OrganizationProfile', orgProfileSchema);