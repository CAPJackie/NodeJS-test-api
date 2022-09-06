import httpStatus from 'http-status';
import Campaign from '../models/campaignModel.js';
import catchAsync from '../utils/catchAsync.js';

const createCampaign = catchAsync(async (req, res) => {
  const newCampaign = await Campaign.create(req.body);

  res.status(httpStatus.CREATED).json({
    status: 'success',
    data: { campaign: newCampaign }
  });
});

const sendEmails = (req, res, next) => {};

export { createCampaign, sendEmails };
