var express = require('express');
var router = express.Router();
const adminCtrl = require('../controllers/AdminCtrl')




router.post('/AdminRegister', adminCtrl.register);

router.post('/AdminLogin', adminCtrl.login);

router.post('/contact', adminCtrl.ContactUs);





module.exports = router;