const OderDetail = require("../models/oder_details.models")
const express = require("express")
const mongoose = require("mongoose")
const message = require("../until/message")

module.exports = {
    createOderDetail: createOderDetail
}

function createOderDetail(req,res){
    var newOderDetail = new OderDetail(req.body)
    newOderDetail.save().then((result) =>{
        res.send(result)
    }).catch(err =>{
       return res.send(err.message)
    })
}
