const express = require("express");
const mongoose = require("mongoose");
const Product = require('../models/products.model');
const Cate = require('../models/categories.model');
const cateService = require("../service/categories.service")
module.exports = {
    getAllCate: getAllCate,
    //getOneCate: getOneCate,
    createCate: createCate,
    updateCate:updateCate,
    deleteCate:deleteCate
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
    // Product.findOne( {id:req.params._id}).then(productData => {
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
function deleteCate(req,res,next){
    let id = req.params.id;
    cateService.deleteCate(id).then(response => {
        res.send(response);
    }).catch(err => {
        res.status(err.statusCode).send(err);
    })
}
function updateCate(req, res, next) {
    var _id = req.body.id;
    var cateData = req.body;
    cateService.updateCate(_id, cateData).then(() => {
        res.send(cateData);
    }).catch(err => {
        res.status(400).send(err);
    })

}