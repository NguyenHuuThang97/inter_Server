var route = require("express").Router()
var mongoose = require("mongoose")
var cateController = require("../controllers/categories.controller");
module.exports = function(){
    route.post("/cate/create",cateController.createCate);
    route.get("/cate/getAll", cateController.getAllCate)
    return route;
}