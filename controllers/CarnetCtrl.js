const Carnet = require('../models/CarnetModel')
const User = require('../models/UserModel')
const validation = require('../middleware/validation')
const Payment = require('../models/PaymentModel')
const paypal = require("paypal-rest-sdk");
const { model } = require('mongoose')

paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id:
      "AUY4m3BFlWN9eWjIXgMSlgUQe-QXRPeUyUcHAt1rDhkcRTbmJRiN1Pj75qThrxsX12QoQl9mZzfNHM8p",
  client_secret:
      "EKg4VsZskkCEQFJnEl8ah4BL1vS4eZuAGoPYEI9nGrYb1WljjcQhuF2PyTOaud6sYD4S8KRWjfxvxYBh"
  });

const CarnetCtrl = {

    AddCarnet: async(req, res)=>{

        const {CarnetName, InfoEpicier, total, idEpicier, randomID} = req.body

          
          const user = await User.findOne({randomID : randomID})
          if(!user) return res.json({msg: "had khona ramakaynsh almardi."})

         const newCarnet = new Carnet({
            CarnetName,
            InfoEpicier,
            total,
            idEpicier,
            randomID
        })


        newCarnet.save()
        .then(data=>{res.send({msg: 'successfully', newCarnet})})
        .catch(err=>{console.log(err)})

    },


       // -----3 Get Epicier By Id----- 
       getCarnetById : async (req, res)=>{

        try {
            const carnet = await Carnet.findById(req.params.idC);
            res.json({carnet});
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server Error" });
          } 
    },

  //   getCarnet : async (req, res)=>{

  //     try {
  //         const carnet = await Carnet.find().populate('Product').exec();
  //         res.json({carnet});
  //       } catch (error) {
  //         console.error(error);
  //         res.status(500).json({ message: "Server Error" });
  //       } 
  // },

    GetCarnetByIdEpicier : async (req, res)=>{

        const id = req.params.idEpicier;

        await Carnet.find({idEpicier : id, type : true})
        .then(carnet=>{ res.json({carnet}) })
        .catch(err=>{ console.log(err) })

    },

    GetCarnetByIdClient : async (req, res)=>{

      const randomID = req.params.randomID;

      await Carnet.find({randomID : randomID})
      .then(carnet=>{ res.json({carnet}) })
      .catch(err=>{ console.log(err) })

  },

  DeleteCarnet : async(req, res)=>{

    try{
    const id = req.params.Id_Carnet
    const  items = {type: false}
    const option = {new : true}
    const result = await Carnet.findByIdAndUpdate(id, items, option)
    res.json({result})
    }
    catch(err){
        console.log(err.message);
    }

},

    // Payment With Paypal 

    PaymentPaypal : async(req, res)=>{

      const IDCarnet = req.params.IDCarnet

      const carnet = await Carnet.findById({ _id: IDCarnet })
      //console.log(carnet);
  
      if(!carnet) return res.json({msg: 'Carnet Not Fund'})
      const totalPrice = carnet.total


      var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
          return_url: `http://10.0.2.2:7000/Carnet/success/${IDCarnet}/${totalPrice}`,
          cancel_url: "http://10.0.2.2:7000/Carnet/cancel"
        },
        transactions: [
          {
              amount: {
                  currency: "USD",
                  total: totalPrice
          },
              description: "This is the payment description."
          }
      ]
    };
    
    
    paypal.payment.create(create_payment_json, function(error, payment) {
      if (error) {
          throw error;
      } else {
          console.log("Create Payment Response");
           console.log(payment);
          // console.log(payment.links[1].href);
          res.redirect(payment.links[1].href);
      }
  });

    },

    Success : async(req, res) => {
    
    var PayerID = req.query.PayerID;
    var paymentId = req.query.paymentId;
    var execute_payment_json = {
        payer_id: PayerID
    };

    paypal.payment.execute(paymentId, execute_payment_json, function(
        error,
        payment
    ) {
        if (error) {
            console.log(error.response);
            throw error;
        } else { 
            console.log("Get Payment Response");
           // console.log("aaaaaaaaa", payment);
            // console.log(JSON.stringify(payment.transactions[0].amount.total));

            const price = req.params.totalPrice
            const idcarnet = req.params.IDCarnet
            console.log(idcarnet);

            const newPayment = new Payment({
             totalPrice : price, 
             idCarnet : idcarnet,
             Type : "Payment"
                       
          })
          const done = newPayment.save()

          const updateTotale = async () =>{
            const result = await Carnet.findById(req.params.IDCarnet);
            console.log(result);
            result.total -= price;
            const done = result.save();

            console.log(done);
          }
          updateTotale()
          
          
          console.log(req.params.IDCarnet);
          console.log(req.params.totalPrice);
          // console.log(JSON.stringify(payment));
          res.render("success");

     
         
      }
    });
       
  }

  

}


module.exports = CarnetCtrl