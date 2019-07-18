const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    // _id: { type: mongoose.Schema.Types.ObjectId },
    ten: {
        type: String,
        required: true
    },
    giabandau: {
        type: String,
        required: true
    },
    anh: {
        type: String,
        required:true
    },
    giamgia: {
        type: String
    },
    trangthai:{
        types:String
    },
    giahientai: {
        type: String,
        required: true
    },
    ngay:{
        type: Date,
        default: Date.now
    },
    soluong:{
        type: Number,
        required:true
    }

});

module.exports = mongoose.model('Product', productSchema);