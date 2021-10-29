const Product = require('../models/ProductModel')
const Carnet = require('../models/CarnetModel')
const { model } = require('mongoose')


const ProductCtrl = {

    AddProduit: async (req, res)=>{

        const {ProductName, Price, Date, idCarnet, Type} = req.body

        const newProduct = new Product({
            ProductName,
            Price,
            Date,
            idCarnet,
            Type: "Product"
        })
        const done = newProduct.save()
            
            if(!done){
                console.log('kayn blan !!!!!!!');
            }else{
                res.send({msg: 'successfully', newProduct})

                const result = await Carnet.findById(idCarnet);
                //console.log(result)
                if (!result) {
                    res.send({ message: "result not found" });
                } else if(Type == "Payment") {
                   result.total -= Price;
                    const subTotal = await result.save();
                    console.log(subTotal);
                 }
                 else{
                    result.total += Price;
                 
                    const subTotal = await result.save();
                    console.log(subTotal);
                  }
                
            }
     
    },

    
    GetProductsByIdCarnet: async (req, res)=>{

        const id = req.params.idCarnet;
        
        await Product.find({idCarnet:id}).sort({createdAt: 'desc'}).exec((err, result) => {
            if(err){
                console.log(err);
            } 
            else{
                res.json({result})
            }
        })
   
    }
}

module.exports = ProductCtrl