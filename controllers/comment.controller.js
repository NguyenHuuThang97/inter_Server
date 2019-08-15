var message = require("../until/message");
var comment = require("../models/comments.model");
var mongoose = require("mongoose");
var productService = require("../service/product.service");
const Product = require('../models/products.model');
module.exports = {
    createComment:createComment,
    // getAllComment:getAllComment,
    // getOneComment:getOneComment,
    // updateComment:updateComment
}

function createComment(req,res){
    var newComment = new comment({
        message:req.body.message,
        email:req.body.email,
        phone:req.body.phone,
        product:req.body.product
    });
    newComment.save().then((result) =>{
        // res.send(result)
        console.log(result)
        if(result){
            productService.updateProduct(req.body.Product, { $push: { comment: result._id } }).then(() =>{
                res.send("Succsess")
                console.log()
            }).catch(err => res.send(err))
        }
        res.status(200).json({
            message: "Add the cate successfully"
        })
    }).catch(err =>{
        return res.send(err.message)
    })
}