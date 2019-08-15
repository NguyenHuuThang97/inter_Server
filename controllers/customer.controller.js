const express = require("express")
const mongoose = require("mongoose");
var Customer = require("../models/customer.model")
var customerService = require("../service/custormer.service")
var message = require("../until/message")

module.exports = {
    getAllCustomer: getAllCustomer,
    getOneCustomer: getOneCustomer,
    createCustomer: createCustomer,
    deleteCustomer: deleteCustomer,
    updateCustomer: updateCustomer
}

function createCustomer(req,res){
   
    Customer.findOne({email:req.body.emai}).then((result) =>{
        if(!result){
            var newCustomer = new Customer(req.body)
            newCustomer.save().then((customer) =>{
                res.send(customer)
            }).catch(err =>{
                return res.send(err.message)

            });
        } else{
            return res.status(400).send({message:"khach hang da ton tai hihi"})
        }
    })
}

function getAllCustomer(req,res,next){
    customerService.getAllCustomer((err,response) =>{
        if(err){
            res.status(err.statusCode).send(err)
        }else{
            res.send(response)
        }
    })
}
function getOneCustomer(req,res,next){
    let id = req.params.id;
    if(!id){
        res.status(400).send({
            message: message.ERROR_MESSAGE.PRODUCT.INVALD
        })
    }
    customerService.getOneCustomer(id).then(response =>{
        res.send(response)
    }).catch(err =>{
        res.status(err.statusCode).send(err)
    })
}
function updateCustomer(req,res,next){
    var _id = req.params.id;
    var customerData = req.body;
    customerService.updateCustomer(_id, customerData).then(() => {
        res.send(customerData);
    }).catch(err => {
        res.status(400).send(err);
    })
}

function deleteCustomer(req,res,next){
    let id = req.body.id;
    customerService.deleteCustomer(id).then((response ) =>{
        res.send(response)
    }).catch((err) =>{
        res.status(err.statusCode).send(err)
    })
}

