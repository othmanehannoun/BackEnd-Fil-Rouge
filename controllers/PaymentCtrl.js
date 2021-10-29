const Payment = require('../models/PaymentModel')


const PaymentCtrl = {

    AddPayment : async (req, res) =>{
        try {
            console.log(req.body);

            const {totalPrice, idCarnet, Type} = req.body

            const newPayment = new Payment({
                totalPrice, 
                idCarnet, 
                Type,
            })

            // Save mongodb
            await newPayment.save()
       
            res.json({msg: 'successfully', 'Payment' : newPayment})


        } catch (err) {
            return res.json({message: err.message})
        }
    },

        // -----3 Get Epicier By Id----- 
        getPaymentByCarnet : async (req, res)=>{

        try {
            const IdCarnet = req.params.id
            const payment = await Payment.find({idCarnet : IdCarnet});
            res.json({payment});
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server Error" });
          } 
    },


    // getTransaction : () =>{
    //     console.log(getPaymentByCarnet());
    // }


}


module.exports = PaymentCtrl