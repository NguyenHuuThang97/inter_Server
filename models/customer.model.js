var mongoose = require('mongoose')
const custormerSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    gender:{
        type:String
    },
    email:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require: true
    },
    phone:{
        type:String,
        require:true
    },
    note:{
        type:String
    },
    comment:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment'
    }],
    oder:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Oder'
    }]
})
module.exports = mongoose.model('Customer',custormerSchema);
