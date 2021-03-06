const mongoose = require('mongoose');

const CarnetSchema = mongoose.Schema({
    
    type : {
        type : Boolean,
        default : true,
       
    },
    CarnetName : {
        type : String,
        require : true,
       
    },
    InfoEpicier :{
        type :String,
        require: true
    }, 
    
    total : {
        type : Number,
        default: 0
    },
    
    idEpicier : {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    // idClient : {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref : 'users', 
    //     require: true
    // },
    randomID : {
        type: String,
        ref : 'users', 
        require: true
    },

},{
    timestamps: true
});


module.exports = mongoose.model('Carnet', CarnetSchema);