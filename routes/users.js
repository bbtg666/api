var express = require('express');

var userController = require('../controllers/user.controller.js');

var router = express.Router();

router.post('/signin', userController.sign_in);
router.post('/register', userController.createUser);
router.get('/islogin', userController.loginRequired, userController.isLogin);

module.exports = router;
