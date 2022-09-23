// @ts-nocheck
import mongoose from 'mongoose';
import validator from 'validator';

const contactSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'You need an email'],
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  isLead: { type: Boolean, default: false },
  _authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

contactSchema.pre(/^find/, function(next) {
  this.populate({
    path: '_authorId',
    select: 'username'
  });

  next();
});

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
