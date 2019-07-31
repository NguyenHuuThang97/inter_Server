var route = require("express").Router()
var mongoose = require("mongoose")
var OderDetailController = require("../controllers/oder_detail.controller")

module.exports = function(){
    route.post("/oderDetail/create",OderDetailController.createOderDetail)
    return route
}