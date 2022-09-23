// @ts-nocheck
import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema({
  description: String,
  startAt: Date,
  endAt: Date,
  isActive: Boolean,
  _contacts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Contact'
    }
  ],
  _authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

campaignSchema.pre(/^find/, function(next) {
  this.populate({
    path: '_authorId',
    select: 'username'
  });
  this.populate({
    path: '_contacts',
    select: 'email'
  });

  next();
});

const Campaign = mongoose.model('Campaign', campaignSchema);

export default Campaign;
