// JavaScript Document
var elements = require('../../models/admin/elements');
module.exports = function(app, errMsg) {
	//show login page
	app
	.post('/admin', function (req, res) {
		console.log('route admin' + req.session.admin);
		if (req.session.admin) {
			res.render('admin/admin', {userName: req.body.username, elements: elements.components});
			req.session.admin = false;
		} else {
			//send login page
		  	res.render('login', {error:errMsg.sessionError});		
		}
		
	});
	
};
