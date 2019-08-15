var route = require("express").Router()
var mongoose = require("mongoose")
var cateController = require("../controllers/categories.controller");
module.exports = function(){
    route.post("/cate/create",cateController.createCate);
    route.get("/cate/getAll", cateController.getAllCate);
    route.delete("/cate/deletecate/:id",cateController.deleteCate);
    route.put("/cate/:id",cateController.updateCate)
    route.get("/cate/getOne/:id",cateController.getOneCate)
    return route;
}