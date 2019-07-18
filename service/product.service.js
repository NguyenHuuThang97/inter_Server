var product = require("../models/products.model");
var message = require("../until/message");
module.exports = {
    getAllProduct:getAllProduct,
    getOneProduct:getOneProduct,
    updateProduct:updateProduct,
    deleteProduct:deleteProduct,
   
}
function getAllProduct(callback){
    product.find({}).exec((err,products) =>{
        if(err){
            callback(err);
        }
        else{
            callback(null,products);
        }
    })
}
function getOneProduct(id){
    return new Promise((res,rej) =>{
        product.findOne({_id:id}).exec((err,productData) =>{
            if(err){
                rej(err)
            }else{
                if(!productData){
                    rej({
                        statusCode:400,
                        message:message.ERROR_MESSAGE.PRODUCT.NOT_FOUND
                    })
                }else{
                    res(productData)
                }
            }
        })
    })
}
function  updateProduct(id, productData){
    return product.findByIdAndUpdate(id,productData);
}

function deleteProduct(id){
    return new Promise((res,rej) =>{
        product.find({_id:id}).exec((err,productData) =>{
            if(err){
                rej(err);
            }else{
                if(!productData){
                    rej({
                        statusCode:400,
                        message:message.ERROR_MESSAGE.PRODUCT.NOT_FOUND
                    });
                }else{
                    product.remove({_id:id}).exec((err,response) =>{
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