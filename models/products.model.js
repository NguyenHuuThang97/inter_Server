const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    // _id: { type: mongoose.Schema.Types.ObjectId },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String    
      //  required:true
    },
    state:{
        type:String,
        required:true
    },
    price: {
        type: String,
        required: true
    },
    day:{
        type: Date,
        default: Date.now
    },
    quantity:{
        type: Number,
        required:true
    },
    lengthProduct:{
        type:Number
    },
    description:{
        type:String,
        required:true
    },
    comment:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment'
    }],
    cate:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Cate'
    }

});

module.exports = mongoose.model('Product', productSchema);