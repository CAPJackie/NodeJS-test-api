import express from 'express';
import {
  createCampaign,
  sendEmails
} from '../controllers/campaignController.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router();

router.route('/').post(verifyToken, createCampaign);

router.route('/:id/send_emails').post(verifyToken, sendEmails);

export default router;
