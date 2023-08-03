const express = require('express');
const router = express.Router();
const userController = require('../../controller/UserController');

router.post('/login', userController.checkLogin);

router.post('/registerUser', userController.registerUser);

router.get('/adminData', userController.fetchAdminData);
router.get('/managerData', userController.fetchManagerData);

router.delete('/deleteUser/:id', userController.deleteUser);

module.exports = router;
