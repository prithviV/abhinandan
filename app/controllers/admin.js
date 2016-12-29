// JavaScript Document
var formModel = require('../models/forms');

module.exports = function(app, errMsg) {
	//show login page
	app
	.get('/admin', function (req, res) {
		res.redirect('/login');
	})
	.post('/admin', function (req, res) {
		console.log(req.session.admin);
		if (req.session.admin) {
			res.render('admin', {userName: req.session.username});
			req.session.admin = false;
		} else {
			//send login page
		  	res.render('login', {error:errMsg.sessionError});		
		}
		
	})
	.get('/admin/logoff', function (req, res) {
		res.redirect('/login');
	})
	.post('/admin/saveFormBuilder', function(req, res) {
		var message = {result: ''};
		
		formModel.find({ ID: req.body.ID }, function(err, form){
			//if there is any server error then handle it
			
			if ( err ) {
				message.result = err;
				res.send(message);
			}
			console.log('forms found in the db');
			console.log(form)
			// if record / form already exist then just update the form's data in DB
			if (form.length) {
				form[0].NAME = req.body.NAME;
				form[0].CONTENT = req.body.CONTENT;
				form[0].save(function(err, saved, affected){
					if(err) {
						message.result = 'unable to update the date for form ' + req.body.ID;
						res.send(message);
					}
					if (saved) {
						message.result = 'Updated data for form ' + req.body.ID;
						res.send(message);
					}
					
				});
				
			} else {
				//if recode / form does not exist then add a new record to the DB
				var dataToSave = {
					ID: req.body.ID,
					NAME: req.body.NAME,
					CONTENT: req.body.CONTENT
				};
				var data = new formModel(dataToSave);
				data.save(function(err, saved, affected){
					
					if(err) {
						console.log('Unable to save the data for form')
						console.log(err)
						message.result = 'Unable to save the data for form ' + req.body.ID;
					}
					if (saved) {
						console.log('Saved the data for form')
						console.log(saved)
						message.result = 'Saved the data for form ' + req.body.ID;
					}
					res.send(message);
				});
			}
		});

		
		
	})
	
};
