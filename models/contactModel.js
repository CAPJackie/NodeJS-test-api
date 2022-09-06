// @ts-nocheck
import mongoose from 'mongoose';

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

export default Contact;

// contacts
// - email: String
// - isLead: Boolean
// - _authorId: Object() (relacionado a users)
