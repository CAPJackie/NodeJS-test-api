import httpStatus from 'http-status';
import Campaign from '../models/campaignModel.js';
import catchAsync from '../utils/catchAsync.js';

const createCampaign = catchAsync(async (req, res) => {
  await Campaign.create(req.body);

  res.status(httpStatus.CREATED).json({
    status: 'success',
    message: `New Campaign created`
  });
});

const sendEmails = (req, res, next) => {};

export { createCampaign, sendEmails };
