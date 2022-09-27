// @ts-nocheck
import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, 'Please Provide a description for the marketing campaign']
  },
  startAt: {
    type: Date,
    required: [true, 'Please Provide an start date for the marketing campaign']
  },
  endAt: {
    type: Date,
    required: [true, 'Please Provide an end date for the marketing campaign']
  },
  isActive: {
    type: Boolean,
    default: false
  },
  contacts: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contact'
      }
    ],
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Campaign = mongoose.model('Campaign', campaignSchema);

export default Campaign;
