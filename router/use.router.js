var userController = require("./../controllers/user.controller");
var productController = require("./../controllers/product.controller")
var customerController = require("../controllers/customer.controller")
var router = require("express").Router();
const mongoose = require("mongoose");
const multer = require('multer');
const Product = require("../models/products.model");
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
    router.post("/product/createProduct", upload.single('image') , (req, res, next) => {
        console.log(res.file);
        const newProduct = new Product({
            name:req.body.name,
            image:req.file.path,
            status:req.body.status,
            price:req.body.price,
            quantity:req.body.quantity,
            description:req.body.description,

        });
        newProduct.save().then(result => {
            console.log(result);
            res.status(201).json({
                message: "Created product successfully",
                createProduct: {
                    name: result.name,
                     image:result.image,
                    status:result.status,
                    price:result.price,
                    quantity:result.quantity,
                    description:result.trangthai
                }
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    });
    router.delete("/product/delete/:id",productController.deleteProduct);
    router.get("/product/findbyproductname/:ten", productController.findProductByName);
    return router;
}