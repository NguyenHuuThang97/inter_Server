const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    created:{
        type: Date,
        default: Date.now
    },
    message:{
        type: String,
        require:true
    },
    status:{
        type:String
    },
    email:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    },
    product:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    }],
    customer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Customer'
    }
})
module.exports = mongoose.model('Comment', commentSchema)