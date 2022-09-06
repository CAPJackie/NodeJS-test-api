// @ts-nocheck
const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  description: String,
  startAt: Date,
  endAt: Date,
  isActive: Boolean,
  _contacts: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Contact'
    }
  ],
  _authorId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
});

const Campaign = mongoose.model('Campaign', campaignSchema);

module.exports = Campaign;

// campaigns
// - description: String
// - startAt: Date
// - endAt: Date
// - isActive: Boolean
// - _contacts: array (relacionado a contacts)
// - _authorId: Object() (relacionado a users)
