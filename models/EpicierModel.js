const {data} = require('joi')
const mongoose = require('mongoose');



const epicierSchema = new mongoose.Schema({
    isValid : {
        type : Boolean,
        default : false
    },
    Username:{
        type: String,
        require: true
    },
    Magazine_Name:{
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    address:{
        type: String,
        require: true
    },
  

},{
    timestamps: true
})


module.exports = mongoose.model('Epicier', epicierSchema);


