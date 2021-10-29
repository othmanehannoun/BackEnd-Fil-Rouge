var express = require('express');
const PaymentCtrl = require('../controllers/PaymentCtrl');
var router = express.Router();

// const {test} = require('../controllers/controller_Client');



// -------- ----------//
router.post('/Payment', PaymentCtrl.AddPayment);
router.get('/getPayment/:id', PaymentCtrl.getPaymentByCarnet);





module.exports = router;