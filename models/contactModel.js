// @ts-nocheck
import mongoose from 'mongoose';
import validator from 'validator';
import User from './userModel';

const contactSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'You need an email'],
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
    unique: true
  },
  isLead: { type: Boolean, default: false },
  author: {
    type: User,
    ref: 'User'
  }
});

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
