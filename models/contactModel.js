// @ts-nocheck
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'You need an email']
  },
  isLead: Boolean,
  _authorId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;

// contacts
// - email: String
// - isLead: Boolean
// - _authorId: Object() (relacionado a users)
