const commentController = require("../controllers/comment.controller");
const route = require("express").Router();
module.exports = function(){
    route.post("/comment/create",commentController.createComment);
    return route;
}