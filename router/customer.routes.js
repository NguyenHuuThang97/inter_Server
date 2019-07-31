var customerController = require("../controllers/customer.controller")
var route = require("express").Router()
var mongoose = require("mongoose")
module.exports = function(){
    route.post("/customer/create",customerController.createCustomer)
    route.get("/customer/getAll",customerController.getAllCustomer)
    return route;
}