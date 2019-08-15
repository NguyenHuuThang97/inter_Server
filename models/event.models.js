const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    detail:{
        type:String
    }
})
module.exports = mongoose.model('Event',eventSchema);