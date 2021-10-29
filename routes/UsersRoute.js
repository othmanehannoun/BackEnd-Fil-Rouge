var express = require('express');
var router = express.Router();
const userCtrl = require('../controllers/ClientCtrl')



router.post('/UserRegister', userCtrl.register);

router.post('/UserLogin', userCtrl.login);
router.get('/getUser/:idUser', userCtrl.getUserById);
router.patch('/update/:id', userCtrl.UpdateUser);

// router.get('/getAllSeller', SellerCtrl.getAllSeller);

// router.get('/logout', SellerCtrl.sellerSignout)


module.exports = router;