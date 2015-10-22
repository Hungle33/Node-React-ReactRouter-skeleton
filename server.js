var express = require('express');
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');
var compression = require('compression');
var logger = require('morgan');
var swig = require('swig');
var mongoose = require('mongoose');
var Character = require('./models/characters');
var routes = require('./app/js/routes');
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var RoutingContext = Router.RoutingContext;

var app = express();
var server = http.createServer(app);

/* Mongoose MongoDB connection */
mongoose.connect(process.env.MONGO_URI || 'localhost/dbname');
mongoose.connection.on('error', function() {
	console.info('Error: Could not connect to MongoDB');
});

/* Middleware */
app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

/* Example Api usage */
app.get('/api/adduser', function(req, res) {
	var character = new Character({characterName:'Frodo'});
	character.save(function(err){
	if(err) console.info('error!');
	});
	res.send("Added");
});

/* More info: https://github.com/rackt/react-router/blob/master/docs/guides/advanced/ServerRendering.md */
/* Handles error pages and matches server side react to client side react */
app.use(function(req, res) {
  Router.match({ routes: routes, location: req.url }, function(err, redirectLocation, renderProps) {
    if (err) {
      res.status(500).send(err.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      var html = ReactDOM.renderToString(<RoutingContext {...renderProps} />);
      var page = swig.renderFile('views/index.html', { html: html });
      res.status(200).send(page);
    } else {
      res.status(404).send('Page Not Found');
    }
  });
});

/* Start server */
server.listen(app.get('port'), function(){
	console.log('Server is listening on port: ' + app.get('port'));
});
