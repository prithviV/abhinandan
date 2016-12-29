// JavaScript Document
/*var path = require('path');*/
var mongoose = require('./mongoose');

var Schema = mongoose.Schema;
// create a schema
var userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {type: String}
});

//create model using schema
var users = mongoose.model('users', userSchema);

module.exports = users;