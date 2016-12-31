// JavaScript Document
var formModel = require('../models/forms');
var mongoose = require('../models/mongoose');
var isAuthenticated = function(req, res, next){
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/')
};
module.exports = function(app, passport, messages) {
	//show login page
	app
	/*
	MANAGE ADMIN PAGE
	*/
	.get('/admin', isAuthenticated, function (req, res) {
		res.render('admin', {userName: req.session.username});
	})
	.post('/admin', function (req, res) {
		
		if (req.session.admin) {
			res.render('admin', {userName: req.session.username});
			
		} else {
			//send login page
			req.session.destroy();
		  	res.render('login', {error: messages.sessionError});
			
		}
		
	})
	.get('/admin/logoff', function (req, res) {
		req.logout();
		res.redirect('/login');
	})
	/*
	FORM BUILDER CHANGES OR UPDATES OR NEW RECORDS
	*/
	.post('/admin/saveForm', function(req, res) {
		var message = {result: ''};
		console.log(req.body);
		formModel.find({ ID: req.body.ID }, function(err, form){
			//if there is any server error then handle it
			console.log(form);
			if ( err ) {
				message.result = err;
				res.redirect('404', {error: err});
			}
			
			// if record / form already exist then just update the form's data in DB
			if (form.length) {
				form[0].NAME = req.body.NAME;
				form[0].CONTENT = req.body.CONTENT;
				//update new record
				form[0].save(function(err, saved, affected){
					if(err) {
						message.result = messages.unableToUpdate + req.body.ID;
						res.redirect('404', {error: err});
					}
					if (saved) {
						message.result = messages.unableToUpdate + req.body.ID;
						res.send(message);
					}

				});
				
			} else {
				//if record / form does not exist then add a new record to the DB
				var dataToSave = {
					ID: req.body.ID,
					NAME: req.body.NAME,
					CONTENT: req.body.CONTENT
				};
				var data = new formModel(dataToSave);
				//save new record
				data.save(function(err, saved, affected){
					if(err) {
						message.result = messages.savedData + req.body.ID;
						res.redirect('404', {error: err});
					}
					if (saved) {
						message.result = messages.savedData + req.body.ID;
						res.send(message);
					} else {
						res.redirect('404', {error: err});
					}
					
				});
			}
		});

		
		
	})

	/*
	VIEW AVAILABLE FORMS
	*/
	.get('/admin/view', function (req, res) {
		formModel.find().then(function(data){
			if ( !data.length ) {
				res.render('view', {});
			} else {
				res.render('view', {records: data});
			}
			
		});
		
	})

	/*
	VIEW SINGLE FORM
	*/
	.get('/admin/edit/:ID', function (req, res) {
		console.log('asdfasdf');
		res.render('admin', {userName: req.session.userName, formRequest: {ID: req.params.ID}});
	})

	/*
	 * GET SINGLE FORM for EDITING
	*/
	.post('/admin/edit', function (req, res) {
		
		formModel.find({ID: req.body.ID}, function(err, doc){
			if (err) {
				res.render('404', {error: messages.unableToDelete});
			}
			if (doc.length) {
				res.send(doc[0]);
			} else {
				res.render('404', {error: messages.unableToDelete});
			}
		});
		
	})
	/*
		DELETE RECORD
	 */
	.get('/admin/delete/:ID', function (req, res) {
		formModel.findOneAndRemove({ID: req.params.ID}, function(err, doc){
			if (err) {
				res.render('404', {error: messages.unableToDelete});
			}
			if (doc) {
				res.redirect('/admin/view');
			}
		});
	})
	
};
