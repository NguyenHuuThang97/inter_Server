var message = require("../until/message")
var cate = require("../models/categories.model")
var mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);
 module.exports = {
    getAllCate: getAllCate,
    updateCate:updateCate,
    deleteCate:deleteCate
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
function updateCate(id,cateData){
   return cate.findByIdAndUpdate(id,cateData);
}
function deleteCate(id){
    return new Promise((res,rej) =>{
        cate.find({_id:id}).exec((err,cateData) =>{
            if(err){
                rej(err);
            }else{
                if(!cateData){
                    rej({
                        statusCode:400,
                        message:message.ERROR_MESSAGE.PRODUCT.NOT_FOUND
                    });
                }else{
                    cate.remove({_id:id}).exec((err,response) =>{
                        if(err){
                            rej(err);
                        }else{
                            res({
                                message:message.SUCCESS_MESSAGE.PRODUCT.DELETED
                            })
                        }
                    })
                }
            }
        })
    });
}