// JavaScript Document
var express = require('express');
var app = express();
var path = require('path');
var routes = require('./app/routes/routes');
var hbs = require('express-handlebars');

app.engine('handlebars', hbs({defaultLayout: 'main', layoutsDir: __dirname + '/app/views/layouts'}));

//setting up views path
app.set('views', path.join(__dirname, '/app/views'));
//set view entine
app.set('view engine', 'handlebars');



//serve static pages
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

//map the routs from routes
app.use('/', routes);


//listen to port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
	console.log('listening to ' + app.get('port') + ' port');	
});