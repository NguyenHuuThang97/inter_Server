const mongoose = require('mongoose')

const cateSchema = mongoose.Schema({
    name:{
        type:String
    }
})

module.exports = mongoose.model('Cate',cateSchema);