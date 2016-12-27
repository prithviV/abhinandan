// JavaScript Document

module.exports = function(app, errMsg) {
	//show login page
	app.use(function(req, res, next){
		var err = new Error('NOT FOUND');
		err.status = 404;
		res.render('404', {});
	});
};


