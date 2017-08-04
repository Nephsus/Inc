var express = require('express');
var path = require('path');
var bodyParser = require('body-parser')
var cors = require('cors');

var app = express();
var application_root = __dirname;
app.use(bodyParser.json())
app.use(cors());

require('./server/routes.js')(app);


var server = app.listen(3000, function() {
    console.log('Listening on port', server.address());
    console.log('application_root: ' + application_root);
});