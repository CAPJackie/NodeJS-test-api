// @ts-nocheck
import httpStatus from 'http-status';
import Campaign from '../models/campaignModel.js';
import Contact from '../models/contactModel.js';
import User from '../models/userModel.js';
import catchAsync from '../utils/catchAsync.js';

const createCampaign = catchAsync(async (req, res) => {
  const user = await User.findById(req.id);
  const contacts = await Contact.find({ email: { $in: req.body.emails } });

  const campaign = new Campaign(req.body);
  await campaign.validate();
  campaign.author = user._id;
  campaign.contacts = contacts;

  campaign.save();

  res.status(httpStatus.CREATED).json({
    status: 'success',
    message: `New Campaign created`
  });
});

const sendEmails = (req, res, next) => {};

export { createCampaign, sendEmails };
