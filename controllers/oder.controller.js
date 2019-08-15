const Oder= require("../models/oders.model")
const express = require("express")
const mongoose = require("mongoose")
const message = require("../until/message")
const oderService = require("../service/oder.service")
module.exports = {
    createOder: createOder,
    updateOder:updateOder,
    getAllOder:getAllOder,
    getOneOder:getOneOder
}

function createOder(req,res){
    var newOder= new Oder(req.body)
    newOder.save().then((result) =>{
        res.send(result)
    }).catch(err =>{
       return res.send(err.message)
    })
}
function getAllOder(req,res,next){
    oderService.getAllOder((err,response) =>{
        if(err){
            res.send(err.statusCode).send(err)
        }else{
            res.send(response)
        }
    })
}
function getOneOder(req,res,next){
    let id = req.params.id;
    if(!id){
        res.status(400).send({
            message: message.ERROR_MESSAGE.PRODUCT.INVALD
        })
    }
    oderService.getOneOder(id).then(response =>{
        res.send(response)
    }).catch(err =>{
        res.status(err.statusCode).send(err)
    })
}
function updateOder(req,res,next){
    let _id = req.params.id;
    var oderData = req.body;
    oderService.updateOder(_id,oderData).then((ahihi) =>{
        res.send(ahihi)
    }).catch(err => {
        res.send(err);
    })

}