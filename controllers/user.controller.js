var mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
var User = require("../models/user.model");
var message = require("../until/message");
exports.register = function(req, res) {

    User.findOne({ email: req.body.email }).then(result => {
      if (!result) {
        var newUser = new User(req.body);
        newUser.save().then(user => {
            res.send(user);
          }).catch(err => {
            return res.send(err.message);
          });
      } else {
        return res
          .status(404)
          .send({ message: "Email da ton tai. Kiem tra lai" });
      }
    });
  };
  
  exports.getAllUser = function(req, res) {
    User.find().then((err, user) => {
      if (err) {
        return res.status(400).send(err);
      } else {
        res.send(user);
      }
    });
  };
  exports.sign_in = function(req, res) {
    User.findOne({ email: req.body.email }).then(user => {
      if (!user) {
        return res.status(404).send("Not found");
      } else {
        if (user.hash_password === req.body.hash_password) {
          return res.status(200).send(user);
        } else {
          return res
            .status(404)
            .send({ message: "Thong tin khong chinh xac. Kiem tra lai !!!" });
        }
      }
    });
  };
  
exports.loginRequired = function(req, res, next) {
    if (req.user) {
      next();
    } else {
      return res.status(401).json({ message: "Unauthorized user!" });
    }
  };
  