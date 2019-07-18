const express = require("express");
const mongoose = require("mongoose");
const multer = require('multer');
const Product = require("../models/products.model");
const productService = require("../service/product.service");
const message = require("../until/message")
var KhongDau = require('khong-dau');
module.exports = {
    getAllProduct: getAllProduct,
    getOneProduct: getOneProduct,
    createProduct: createProduct,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct,
    findProductByName: findProductByName
}


function createProduct(req, res) {
    var newProduct = new Product(req.body);
    newProduct.save().then(result => {
        res.send(result);
    }).catch(err => {
        return res.send(err.message);
    })
    uploadFile(req, res, (err) => {
        if (err) {
            res.send(err);
        } else {

        }
    });
}

function getAllProduct(req, res, next) {
    productService.getAllProduct((err, response) => {
        if (err) {
            res.status(err.statusCode).send(err);
        } else {
            res.send(response);
        }
    });
}
function getOneProduct(req, res, next) {
    let id = req.params.id;
    console.log(id);
    if (!id) {
        res.status(400).send({
            message: message.ERROR_MESSAGE.PRODUCT.INVALD
        })
    }
    productService.getOneProduct(id).then(response => {
        res.send(response)
        console.log(response)
    }).catch(err => {
        res.status(err.statusCode).send(err);
    })
}
function updateProduct(req, res, next) {
    var _id = req.body.id;
    var productData = req.body;
    productService.updateProduct(_id, productData).then(() => {
        res.send(productData);
    }).catch(err => {
        res.status(400).send(err);
    })

}
function deleteProduct(req, res, next) {
    let id = req.params.id;
    productService.deleteProduct(id).then(response => {
        res.send(response);
    }).catch(err => {
        res.status(err.statusCode).send(err);
    })
}
function convert_cityname(str) {
    // Chuyển hết sang chữ thường
    str = new String();
    str = str.toLowerCase();

    // xóa dấu
    str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, "a");
    str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, "e");
    str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, "i");
    str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, "o"); 
    str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, "u");
    str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, "y");
    str = str.replace(/(đ)/g, "d");

    // Xóa ký tự đặc biệt
    str = str.replace(/([^0-9a-z-\s])/g, "");

    // Xóa khoảng trắng thay bằng ký tự -
    str = str.replace(/(\s+)/g, "-");

    // xóa phần dự - ở đầu
    str = str.replace(/^-+/g, "");

    // xóa phần dư - ở cuối
    str = str.replace(/-+$/g, "");

    // return
    return str;
}

function findProductByName(req, res) {
    
    const ten =  convert_cityname(req.params.ten);
    const regex = new RegExp(ten, 'gi');
    // Product.find({ten:regex},(err,products) =>{
    //     if(err){
    //         res.send(err);
    //     }else{
    //         if(products.length < 1){
    //             res.send({
    //                 message:message.ERROR_MESSAGE.PRODUCT.INVALD
    //             });
    //         }else{
    //             res.send(products);
    //             console.log(products);
    //         }
    //     }
    // })
    // const ten = (req.params.ten,'i');
    // const regex = new RegExp(req.query.ten, 'gi');
    console.log(ten);
    let _products = [];
    Product.find().then(products => {
        for (let index = 0; index < products.length; index++) {
            if (convert_cityname(products[index].name).includes(String(regex))) {
                _products.push(products[index]);
            }
        }
        console.log(_products);
        res.send(_products);
    })
        .catch(err => {
            res.send({ message: err.message });
        });
}