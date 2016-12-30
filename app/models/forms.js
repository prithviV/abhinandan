// JavaScript Document
/*Create schema for formdata*/
var mongoose = require('./mongoose');

var Schema = mongoose.Schema;
// create a schema
var formDataSchema = new Schema({
  ID: { type: String, required: true, unique: true },
  CONTENT: []
});

//create model using schema
var forms = mongoose.model('forms', formDataSchema);

module.exports = forms;