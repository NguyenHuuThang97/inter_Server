const OderDetail = require("../models/oder_details.models")
const express = require("express")
const mongoose = require("mongoose")
const message = require("../until/message")
const product = require('../models/products.model');
var OderDetailService = require("../service/oder_detail.service")
const productService = require("./../service/product.service");
module.exports = {
    createOderDetail: createOderDetail,
    updateOderDetail: updateOderDetail
}

function createOderDetail(req,res){
    var newOderDetail = new OderDetail(req.body)
    newOderDetail.save().then((result) =>{
        
      res.send(result)
    }).catch(err =>{
       return res.send(err.message)
    })
}

function updateOderDetail(req,res,next){
    var _id = req.params.id;
    var oderDetailData = req.body;
   OderDetailService.updateOderDetail(_id, oderDetailData).then(() => {
        res.send(oderDetailData);
    }).catch(err => {
        res.status(400).send(err);
    })
}
