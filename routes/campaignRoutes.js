import express from 'express';
import {
  createCampaign,
  sendEmails
} from '../controllers/campaignController.js';

const router = express.Router();

router.route('/').post(createCampaign);

router.route('/:id/send_emails').post(sendEmails);

export default router;
