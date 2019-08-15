var userController = require("./../controllers/user.controller");
var productController = require("./../controllers/product.controller")
var customerController = require("../controllers/customer.controller")
var router = require("express").Router();
const mongoose = require("mongoose");
const multer = require('multer');
const Product = require("../models/products.model");
const AWS = require('aws-sdk');
const Busboy = require('busboy');
var path = require("path")
const cateService = require("../service/categories.service");
const Cate = require('../models/categories.model');
const BUCKET_NAME = '';
const IAM_USER_KEY = '';
const IAM_USER_SECRET = '';
//khởi tạo biến cấu hình cho việc lưu trữ file update
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //biến cb kiểm tra xem  file có được chấp nhận để lưu trữ hay k?    
        cb(null, './uploads'); //Định nghĩa nơi update file được lưu lại
    },
    filename: function (req, file, cb) { //đặt tên cho file
        // const now = new Date().toISOString();
        // const date = now.replace(/:/g, '-'); 
        // cb(null, date + file.originalname);
        // cb(null, new Date().toISOString() + file.originalname);
        cb(null, Date.now() + '_' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage, // chỉ ra nơi lưu trữ
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

// let uploadFile = upload.single('anh');
module.exports = function () {
    router.post("/user/create", userController.register);
    router.get("/user/get", userController.getAllUser);
    router.post("/user/sign", userController.sign_in);
    router.get("/product/allProduct", productController.getAllProduct);
    router.get("/product/oneProduct/:id", productController.getOneProduct);
    router.post("/product/createProduct", upload.single('image'), (req, res, next) => {
        const newProduct = new Product({
            name: req.body.name,
            image: req.file.path,
            state: req.body.state,
            price: req.body.price,
            quantity: req.body.quantity,
            description: req.body.description,
            cate: req.body.cate
        });
        newProduct.save().then(result => {
            if (result) {
                cateService.updateCate(req.body.cate, { $push: { product: result._id } }).then(() => {
                    res.send("succsess")
                }).catch(err => res.send(err))
            }
            res.status(200).json({
                message: "Add the cate successfully"
            })
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    });
    router.put("/product/updateProduct/:id",productController.updateProduct);
    router.delete("/product/delete/:id", productController.deleteProduct);
    router.get("/product/findbyproductname/:ten", productController.findProductByName);
    return router;
}