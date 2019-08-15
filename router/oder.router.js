var route = require("express").Router()
var mongoose = require("mongoose")
var OderController = require("../controllers/oder.controller")

module.exports = function(){
    route.post("/oder/create",OderController.createOder);
    route.put("/oder/updateOder/:id",OderController.updateOder);
    route.get("/oder/getAll",OderController.getAllOder);
    route.get("/oder/getOne/:id",OderController.getOneOder);
    return route
}