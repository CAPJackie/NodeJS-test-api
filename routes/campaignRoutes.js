const express = require('express');

const router = express.Router();
const campaignController = require('../controllers/campaignController');

router.route('/').post(campaignController.createCampaign);

router.route('/:id/send_emails').post(campaignController.sendEmails);

module.exports = router;
