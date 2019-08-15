const mongoose = require('mongoose')

const oderDetailSchema = mongoose.Schema({
    sl:{
        type:Number
    },
    product:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Product'
    }]
})

module.exports = mongoose.model('OderDetail',oderDetailSchema)