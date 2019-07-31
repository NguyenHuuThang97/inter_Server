const mongoose = require('mongoose')

const oderschema = mongoose.Schema({
    created_oder: {
        type:Date,
        default: Date.now
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
        type: String,
        require:true
    }
})
module.exports = mongoose.model('Oder',oderschema);