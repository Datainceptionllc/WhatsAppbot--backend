const express = require('express');
const router = express.Router();
const userController = require('../../controller/UserController');


router.post('/login', userController.checkLogin);

router.post('/registerUser', userController.registerUser);


module.exports = router;