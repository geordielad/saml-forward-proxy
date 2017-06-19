const express = require('express');
const http = require('http');
const https = require('https');
const path = require('path');
const passport = require('passport');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const errorhandler = require('errorhandler');
const util = require('util');
const fs = require('fs');

const samlEncodeDecode = require('saml-encoder-decoder-js');

const xml2js = require("xml2js");
const xpath = require("xml2js-xpath");

var env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];

console.log('Using configuration', config);

require('./config/passport')(passport, config);

var app = express();

var sslOptions = config.app.sslOptions;

app.set('port', config.app.port);
app.set('views', __dirname + '/app/views');
app.set('view engine', 'jade');
app.use(morgan('combined'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session(
  {
    resave: true,
    saveUninitialized: true,
    secret: 'Tableau Really Rocks'
  }));
app.use(passport.initialize());
app.use(passport.session());
//app.use(express.static(path.join(__dirname, 'public')));

require('./config/routes')(app, config, passport, util, samlEncodeDecode, xml2js, xpath);

if (config.app.protocol == 'https') {
  https.createServer(sslOptions, app).listen(app.get('port'), function () {
    console.log('SAML Forward Proxy listening on port ' + app.get('port') + ' using https');
  });
}
else {
  http.createServer(app).listen(app.get('port'), function () {
    console.log('SAML Forward Proxy listening on port ' + app.get('port') + ' assuming http');
  });
}


//app.listen(app.get('port'), function () {
//  console.log('Express server listening on port ' + app.get('port'));
//});
