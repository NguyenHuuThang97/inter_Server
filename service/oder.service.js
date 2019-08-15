var message = require("../until/message");
var Oder = require("../models/oders.model");
 module.exports = {
     updateOder:updateOder,
     getAllOder:getAllOder,
     getOneOder:getOneOder
 }
 function getAllOder(callback){
     Oder.find().exec((err,oders) =>{
         if(err){
             callback(err)
         }else{
             callback(null,oders)
         }
     })
 }

 function getOneOder(id){
     return new Promise((res,rej) =>{
         Oder.findById(id).populate({path: "oder_detail", populate:{path:"product"}}).populate('customer').exec((err,oderData) =>{
             if(err){
                 rej(err)
             }else{
                 if(!oderData){
                     rej({
                        statusCode:400,
                        message:message.ERROR_MESSAGE.PRODUCT.NOT_FOUND
                     })
                 }else{
                     res(oderData)
                 }
             }
         })
     })
 }

 function updateOder(id,oderData){
    return Oder.findByIdAndUpdate(id, oderData)
 }