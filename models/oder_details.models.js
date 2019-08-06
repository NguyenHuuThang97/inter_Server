const mongoose = require('mongoose')

const oderDetailSchema = mongoose.Schema({
    quantity:{
        type:number
    },
    product:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Product'
    }],
    oder:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Oder'
    }
})

module.exports = mongoose.model('OderDetail',oderDetailSchema)