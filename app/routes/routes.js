// JavaScript Document
var express = require('express');
var path = require('path');
var routes = express.Router();
var views = path.join(__dirname, '/../views/')
var bodyParser =  require('body-parser');
var messages = require(path.join(__dirname, '/../models/messages'));

console.log(messages);
//bordyparser adds the form data requested with out which we won't be able to read the submitted formdata
routes.use(bodyParser.urlencoded({extended: true}))


//server static pages

//show login page on load
routes
.get('/', function (req, res) {
  //send login page
  console.log(messages);
  res.render('login', {title:'', condition: ''});
  
})

.get('/login', function (req, res) {
  //send login page
  res.render('login', {});
  
});


//show login page on load
routes.post('/login', function (req, res) {
  if (req.body.userName == 'admin' && req.body.userName =='admin') {
		res.render('admin', {});  
  } else {
		res.render('login', {error:messages.loginError});
  }
  
});
routes.use("*",function(req,res){
  res.render('404', {title:'', condition: ''});
});

module.exports = routes;