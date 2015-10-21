var express = require('express');
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');
var compression = require('compression');
var logger = require('morgan');
var swig = require('swig');
var mongoose = require('mongoose');
var Character = require('./models/characters');
var routes = require('./js/routes');
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var RoutingContext = Router.RoutingContext;

var app = express();
var server = http.createServer(app);

/* MongoDB connection */
mongoose.connect(process.env.MONGO_URI || 'localhost/testapi');
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
	res.send("added");
});

/* Dealing with server side react routing, code directly from react-router guide 
404 and 500 server errors are included so this must be below all other routes and middleware */
/* more info: https://github.com/rackt/react-router/blob/master/docs/guides/advanced/ServerRendering.md */
app.use(function(req, res) {
  Router.match({ routes: routes, location: req.url }, function(err, redirectLocation, renderProps) {
    if (err) {
      res.send(500, err.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      var html = ReactDOM.renderToString(<RoutingContext {...renderProps} />);
      var page = swig.renderFile('views/index.html', { html: html });
      res.send(200, page);
    } else {
      res.send(404, 'Page Not Found')
    }
  });
});

/* Server */
server.listen(app.get('port'), function(){
	console.log('Server is listening on port: ' + app.get('port'));
});
