var customerController = require("../controllers/customer.controller")
var route = require("express").Router()
var mongoose = require("mongoose")
module.exports = function(){
    route.post("/customer/create",customerController.createCustomer)
    route.get("/customer/getAll",customerController.getAllCustomer)
    route.get("/customer/getOne/:id",customerController.getOneCustomer)
    route.put("/customer/updateCustomer/:id",customerController.updateCustomer)
    return route;
}