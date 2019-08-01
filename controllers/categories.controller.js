const express = require("express");
const mongoose = require("mongoose");
const Product = require('../models/products.model');
const Cate = require('../models/categories.model');
const cateService = require("../service/categories.service")
module.exports = {
    getAllCate: getAllCate,
    //getOneCate: getOneCate,
    createCate: createCate
}
function getAllCate(req, res, next){
    cateService.getAllCate((err,response) =>{
        if(err){
            res.status(err.statusCode).send(err)
        }else{
            res.send(response)
        }
    })
}
function createCate(req, res, next) {
        var newCate = new Cate(req.body);
        newCate.save().then(result => {
            res.send(result);
        }).catch(err => {
            return res.send(err.message);
        })
    // Product.findById(req.body.id).then(productData => {
    //     if (!productData) {
    //         return res.status(404).json({
    //             message: "Product not found"
    //         })
    //     }
    //     const newCate = new Cate({
    //         name:req.body.name,
    //         product:req.body.id
    //     });
    //     return newCate.save();
    // }).then(result =>{
    //     console.log(result);
    //     res.status(201).json({
    //         message:"success"
    //     })
    // }).catch(err =>{
    //     console.log(err);
    //     res.status(500).json({
    //         error: err
    //     });
    // })
}
