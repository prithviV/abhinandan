// JavaScript Document

var express = require('express');
var app = express();
var path = require('path');
var hbs = require('express-handlebars');
var bodyParser =  require('body-parser');
var session = require('express-session');
//error messages
var errors = require('./app/models/errors');
global.base = path;
//route/controllers
var login = require('./app/controllers/login');
//route/controllers
var admin = require('./app/controllers/admin/admin');
//route/controllers
var error404 = require('./app/controllers/404');
/*session*/
app.use(session({ secret: 'Abhinandan', resave: true, saveUninitialized: true }));


/*middlewear*/
//serve static pages
app.use('/bootstrap/', express.static(__dirname + '/node_modules/bootstrap/'));
app.use('/jquery/', express.static(__dirname + '/node_modules/jquery/'));

//bordyparser adds the form data requested with out which we won't be able to read the submitted formdata
app.use(bodyParser.urlencoded({extended: true}))
//map the routes for login
login(app, errors);
//map the routes for login
admin(app, errors);
/*handle 404 issues*/
error404(app, errors);


/*templating*/
app.engine('handlebars', hbs({defaultLayout: 'main', layoutsDir: __dirname + '/app/views/layouts', partialsDir: [ __dirname + '/app/views/partials',__dirname + '/app/views/admin/partials']}));
//setting up views path
app.set('views', path.join(__dirname, '/app/views'));

//set view template engine
app.set('view engine', 'handlebars');




/*start server*/
//listen to port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
	console.log('listening to ' + app.get('port') + ' port');	
});