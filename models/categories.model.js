const mongoose = require('mongoose')

const cateSchema = mongoose.Schema({
    name:{
        type:String
    },
    product: [{type:mongoose.Schema.Types.ObjectId,ref:'Product'}]
})

module.exports = mongoose.model('Cate',cateSchema);