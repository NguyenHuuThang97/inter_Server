var mongooes = require("mongoose");
 var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongooes.Schema;

var UserSchema = new Schema({
    fullName: {
      type: String,
      trim: true,
      required:true,
      unique: true
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required:true
    },
      
    hash_password: {
      type: String,
      required:true
    },
    created: {
      type: Date,
      default: Date.now
    },
    oder:[{
      type:mongooes.Schema.Types.ObjectId,
      ref:'Oder'
    }]
  });

var User = mongooes.model('User', UserSchema);

module.exports = User;