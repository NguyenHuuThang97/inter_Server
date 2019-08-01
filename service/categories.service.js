var message = require("../until/message")
var cate = require("../models/categories.model")

 module.exports = {
    getAllCate: getAllCate
}

function getAllCate(callback){
    cate.find().exec((err, cates) => {
        if (err) {
            callback(err)
        }
        else {
            callback(null, cates)
        }
    })
}