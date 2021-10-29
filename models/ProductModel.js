const { string } = require('joi');
const mongoose = require('mongoose');

const ProduitSchema = mongoose.Schema({
    ProductName : {
        type : String,
        require : true,
       
    },
    Price : {
        type : Number,
        require: true
    },
    
    Date : {
        type: String,

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


module.exports = mongoose.model('Product', ProduitSchema);