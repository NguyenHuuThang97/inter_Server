var message = require("../until/message");
var comment = require("../models/comments.model");
var mongoose = require("mongoose");
module.exports = {
    getAllComment:getAllComment,
    updateComment:updateComment,
    getOneComment:getOneComment
}