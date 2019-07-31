const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    created:{
        type: Date,
        default: Date.now
    },
    message:{
        type: String
    },
    status:{
        type:String
    },
    customer:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Customer'
    }],
    product:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Customer'
    }]
})
module.exports = mongoose.model('Comment', commentSchema)