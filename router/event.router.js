var route = require("express").Router()
var mongoose = require("mongoose")
var eventController = require("../controllers/event.controller")
module.exports = function(){
    route.post("/event/create",eventController.createEvent);
    route.get("/event/getAll",eventController.getAllEvent)
    return route;
}