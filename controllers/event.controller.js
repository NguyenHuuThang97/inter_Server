const express = require("express")
const mongoose = require("mongoose");
var event = require("../models/event.models");
var eventService = require("../service/event.service");

module.exports = {
    createEvent: createEvent,
    getAllEvent: getAllEvent
}

function createEvent(req, res, next) {
    var newEvent = new event(req.body);
    newEvent.save().then((result) => {
        res.send(result)
    }).catch(err => {
        return res.send(err.message);
    })
}

function getAllEvent(req,res,next){
    eventService.getAllEvent((err, response) => {
        if (err) {
            res.status(err.statusCode).send(err);
        } else {
            res.send(response);
        }
    });
}