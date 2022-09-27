// @ts-nocheck
import httpStatus from 'http-status';
import Campaign from '../models/campaignModel.js';
import Contact from '../models/contactModel.js';
import User from '../models/userModel.js';
import catchAsync from '../utils/catchAsync.js';
import Email from '../utils/email.js';

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

const sendEmailsToContacts = catchAsync(async (req, res, next) => {
  const campaign = await Campaign.findById(req.params.id);
  const user = await User.findById(req.id);

  if (!campaign.author.equals(user._id)) {
    res.status(500).json({
      status: 'fail',
      message: 'You are not the owner of the marketing campaign'
    });
  }

  if (!campaign.isActive) {
    res.status(500).json({
      status: 'fail',
      message: 'Campaign is not active'
    });
  }

  try {
    const contacts = await Contact.find({
      _id: { $in: campaign.contacts }
    }).select('email -_id');

    await new Email().sendCampaignNotificationToContacts(
      contacts.map(({ email }) => email).join(', ')
    );

    res.status(200).json({
      status: 'success',
      data: campaign.contacts
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'fail',
      message: 'There was an error sending the email. Try again later!'
    });
  }
});

export { createCampaign, sendEmailsToContacts };
