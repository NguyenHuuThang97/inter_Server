const mongoose = require('mongoose')

const oderschema = mongoose.Schema({
    created_oder: {
        type:Date,
        default: Date.now
    },
    status:{
        type:Number,
        default:0
    },
    oder_detail:[{
        type:String,
        ref:'OderDetail'
    }],
    customer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Customer'
    },
    total:{
        type: Number,       
        require:true
    },
    employee:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})
module.exports = mongoose.model('Oder',oderschema);