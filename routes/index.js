var express = require('express');
const SendmailTransport = require('nodemailer/lib/sendmail-transport');
var router = express.Router();

// const {test} = require('../controllers/controller_Client');



// -------- ----------//
router.get('/', (req, res) =>{
   res.send("page test ")
})




module.exports = router;