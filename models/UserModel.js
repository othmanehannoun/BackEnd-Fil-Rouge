const {data} = require('joi')
const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
    last_name:{
        type: String,
        require: true
    },
    first_name:{
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


module.exports = mongoose.model('users', userSchema);


