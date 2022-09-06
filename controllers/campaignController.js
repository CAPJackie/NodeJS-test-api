import Campaign from '../models/campaignModel.js';

const createCampaign = async (req, res, next) => {
  const newCampaign = await Campaign.create(req.body);

  res.status(201).json({
    status: 'success',
    data: { campaign: newCampaign }
  });
};
const sendEmails = (req, res, next) => {};

export { createCampaign, sendEmails };
