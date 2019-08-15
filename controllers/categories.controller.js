const express = require("express");
const mongoose = require("mongoose");
const Product = require('../models/products.model');
const Cate = require('../models/categories.model');
const cateService = require("../service/categories.service");
const productService = require("../service/product.service");
module.exports = {
    getAllCate: getAllCate,
    getOneCate: getOneCate,
    createCate: createCate,
    updateCate: updateCate,
    deleteCate: deleteCate
}
function getAllCate(req, res, next) {
    cateService.getAllCate((err, response) => {
        if (err) {
            res.status(err.statusCode).send(err)
        } else {
            res.send(response)
        }
    })
}
function getOneCate(req, res, next) {
    let id = req.params.id;
    if (!id) {
        res.status(400).send({
            message: message.ERROR_MESSAGE.PRODUCT.INVALD
        })
    }
    cateService.getOneCate(id).then(response => {
        res.send(response)
        console.log(response)
    }).catch(err => {
        res.status(err.statusCode).send(err);
    })
}
function createCate(req, res, next) {
    var newCate = new Cate({
        name: req.body.name,
        product: req.body.product
    })
    newCate.save().then(result => {
        if (result) {
            productService.updateProduct(req.body.product, { $push: { type: result._id } }).then(() => { res.send("succsess") }).catch(err => res.send(err))
        }
        res.status(200).json({
            message: "Add the cate successfully"
        })
    }).catch(err => {
        return res.send(err.message);
    })
}
function deleteCate(req, res, next) {
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