var express = require('express');
var router = express.Router();
const CarnetCtrl = require('../controllers/CarnetCtrl');
const { route } = require('./UsersRoute');



router.post('/Carnet', CarnetCtrl.AddCarnet);
router.get('/carnetbyepicier/:idEpicier', CarnetCtrl.GetCarnetByIdEpicier)
router.get('/carnetbyclient/:idClient', CarnetCtrl.GetCarnetByIdClient)
router.get('/carnetId/:idC', CarnetCtrl.getCarnetById )
// router.get('/getcarnet', CarnetCtrl.getCarnet )

router.get('/paypal/:IDCarnet' , CarnetCtrl.PaymentPaypal)
router.get('/success/:IDCarnet/:totalPrice', CarnetCtrl.Success)
router.get("/cancel", (req, res) => {
    res.send("cancel");
});






module.exports = router;