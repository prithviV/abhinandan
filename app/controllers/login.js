// JavaScript Document
var users = require('../models/users');
var mongoose = require('../models/mongoose');

module.exports = function(app, passport, messages) {
	//show login page
	app
		/*REDIRECT TO LOGIN */
		.get('/', function (req, res) {
		  res.render('login', {title:'', condition: ''});
		})
		.get('/login', function (req, res) {
		  //send login page
		  res.render('login', {error: req.flash('message')});
		})

		.post('/login', passport.authenticate('login', {
			successRedirect: '/admin',
			failureRedirect: '/login',
			failureFlash : true 
		}));
		/*LOGIN*/
		// .post('/login', function (req, res) {

		// 	//first check if server is up
		// 	if (mongoose.connection.readyState) {
		// 		users.find({ username: req.body.userName, password: req.body.userPassword }, function(err, users){
		// 			if ( err ) {
		// 				res.render('404', {error: err});
		// 			}
		// 			if (users.length) {
		// 				req.session.admin = true;
		// 				req.session.username = req.body.userName;
		// 				res.redirect(307, '/admin');
		// 			} else {
		// 				res.render('login', {error: messages.loginError});	
		// 			}
		// 		});
		// 	} else {
		// 		res.render('404', {error: messages.serverDown});	
		// 	}
		// });
};


