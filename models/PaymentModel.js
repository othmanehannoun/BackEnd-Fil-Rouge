const { string } = require('joi');
const mongoose = require('mongoose');

const PaymentSchema = mongoose.Schema({
 
    totalPrice : {
        type : Number,
        require: true
    },

    idCarnet : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Carnet',
        require: true
    },

    Type :{
        type: String,
        require : true
    },

},{
    timestamps: true
});


module.exports = mongoose.model('Payment', PaymentSchema);