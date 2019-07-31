const mongoose = require('mongoose')

const oderDetailSchema = mongoose.Schema({
    product:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Product'
    }]
})

module.exports = mongoose.model('OderDetail',oderDetailSchema)