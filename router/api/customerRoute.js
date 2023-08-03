const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const router = express.Router();
const customerController = require('../../controller/CustomerController');

router.post(
  '/upload',
  upload.single('file'),
  customerController.uploadFileContents,
);

router.get('/customerData', customerController.getCustomerData);

router.get('/expiredPolicy', customerController.getExpiredPolicyData);

module.exports = router;
