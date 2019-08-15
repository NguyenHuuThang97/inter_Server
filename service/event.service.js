var message = require("../until/message");
var event = require("../models/event.models");
 module.exports ={
     getAllEvent:getAllEvent
 }

 function getAllEvent(callback){
    event.find().exec((err,evets) =>{
        if(err){
            callback(err)
        }else{
            callback(null,evets)
        }
    })
 }