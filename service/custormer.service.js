var customer = require("../models/customer.model")
var message = require("../until/message")

module.exports = {
    getAllCustomer: getAllCustomer,
    getOneCustomer: getOneCustomer,
    createCustomer: createCustomer,
    // deleteCustomer: deleteCustomer,
    updateCustomer: updateCustomer
}

function getAllCustomer(callback) {
    customer.find().exec((err, customers) => {
        if (err) {
            callback(err)
        }
        else {
            callback(null, customers)
        }
    })
}

function getOneCustomer(id) {
    return new Promise((res, rej) => {
        customer.findOne({ _id: id }).exec((err, customerData) => {
            if (err) {
                rej(err)
            } else {
                if (!customerData) {
                    rej({
                        statusCode: 400,
                        message: message.ERROR_MESSAGE.CUSTOMER.NOT_FOUND
                    })
                } else {
                    rej(customerData)
                }
            }
        })
    })
}


function createCustomer(req, callback) {
    var newCustomer = new customer(req.body)
    newCustomer.save((err, res) => {
        if (err) {
            callback(err)
        } else {
            callback(null, res)
        }
    })
}
function updateCustomer(id, customerData) {
    return customer.findByIdAndUpdate(id, customerData)
}
function deleteCustomer(id) {
    return new Promise((res, rej) => {
        customer.find({ _id: id }).exec((err, customerData) => {
            if (err) {
                rej(err)
            } else {

                if (!customerData) {
                    rej({
                        statusCode: 400,
                        message: message.ERROR_MESSAGE.CUSTOMER.NOT_FOUND
                    })
                } else {
                    customer.remove({ _id: id }).exec((err, response) => {
                        if (err) {
                            rej(err)
                        } else {
                            res({
                                message: message.SUCCESS_MESSAGE.CUSTOMER.DELETED
                            })
                        }
                    })
                }
            }
        })
    })
}