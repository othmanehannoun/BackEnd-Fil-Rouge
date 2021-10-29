const mongoose = require('mongoose');

const SuperAdminSchema = mongoose.Schema({

    Username : {
        type : String,
        require : true,
    },

    email :{
        type :String,
        require: true
    }, 
    
    password : {
        type : String,
        require: true
    },

},{
    timestamps: true
});


module.exports = mongoose.model('SuperAdmin', SuperAdminSchema);