// Example express application adding the parse-server module to expose Parse
// compatible API routes.

var express = require('express');
var log     = require('./lib/log')(module);
var config  = require('./lib/config');
var ParseServer = require('parse-server').ParseServer;

var api = new ParseServer({
  databaseURI: 'mongodb://localhost:27017/'+config.get('database'),
  //cloud: config.get('myCloud'),
  appId: config.get('myAppId'),
  masterKey: config.get('myMasterKey')
});
// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey

var app = express();

// Serve the Parse API on the /parse URL prefix
var mountPath = config.get('parseMount');
app.use(mountPath, api);

// Parse Server plays nicely with the rest of your web routes
app.get('/', function(req, res) {
  res.status(200).send('Hello World!');
});

var port = config.get('port');
app.listen(port, function() {
    log.info('server running on port ' + port + '.');
});
