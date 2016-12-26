
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , unirest = require('unirest');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', routes.index);
app.post('/samuraize',function (req,res) {
  var getPage = require('summarizer').getPage;

  var uri = req.body.uri;

  getPage(uri).then(function (data) {
    res.send(JSON.stringify(data, null, 2));
  }, console.error);
});

app.listen(3005, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
