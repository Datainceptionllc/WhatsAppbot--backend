const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const router = express.Router();
const conversationTransactionController = require('../../controller/ConversationTransactionController');

router.post(
  '/sendNotifcationAfterUpload',
  upload.single('file'),
  conversationTransactionController.uploadFileContents
);

router.get(
  '/conversationTransactionData',
  conversationTransactionController.getConversationTransactionData
);

module.exports = router;
