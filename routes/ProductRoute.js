var express = require('express');
var router = express.Router();
const ProductCtrl = require('../controllers/ProductsCtrl');




router.post('/AddProduct', ProductCtrl.AddProduit);
router.get('/productbycarnet/:idCarnet', ProductCtrl.GetProductsByIdCarnet)
// router.patch('/UpdateTotal/:idCarnet/:Price', ProductCtrl.UpdateTotal)




module.exports = router;