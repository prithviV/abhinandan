// JavaScript Document
var users = require('../models/users');

module.exports = function(app, errMsg) {
	//show login page
	app
		.get('/', function (req, res) {
		  res.render('login', {title:'', condition: ''});
		})
		.get('/login', function (req, res) {
		  //send login page
		  res.render('login', {});
		})
		//show login page on load
		.post('/login', function (req, res) {
			
			users.find({ username: req.body.userName, password: req.body.userPassword }, function(err, users){
				
				if ( err ) {
					res.render('404', {error: err});
				}
				if (users.length) {
					req.session.admin = true;
					req.session.username = req.body.userName;
					res.redirect(307, '/admin');
				} else {
					res.render('login', {error: errMsg.loginError});	
				}
			});
			//res.send(req.body);
		  /*if (req.body.userName == 'admin' && req.body.userPassword =='admin') {
			//res.render('admin', {});
			res.redirect(307, '../admin');
		  } else {
			
			res.render('login', {error:errMsg.loginError});
		  }*/
		  
		});
};


