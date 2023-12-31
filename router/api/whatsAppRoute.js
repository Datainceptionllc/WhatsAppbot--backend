const express = require('express');
const router = express.Router();

const whatappWebhooks = require('../../middleware/whatsappWebhooks');

router.get('/webhook', whatappWebhooks.webhookVerify);

router.post('/webhook', whatappWebhooks.receiveReplyHook);

router.post('/sendNotification', whatappWebhooks.sendTemplateToCustomers);

router.post(
  '/sendNotificationToAll',
  whatappWebhooks.sendTemplateToAllCustomers
);

module.exports = router;
