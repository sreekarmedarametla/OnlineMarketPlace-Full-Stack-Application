'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var session=require('express-session');

var routes = require('./routes');
var users = require('./routes/users');
var home=require('./routes/home');
var winston = require('winston');


var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




//session part
app.use(session({
  secret: 'cmpe273_ebay',
  resave: false,  //don't save session if unmodified
  saveUninitialized: false,	// don't create session until something stored
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));

// adding winston

var logger1 = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({ filename: './bi' +
    'n/logs/a.log' })
  ]
});

logger1.log('info', 'Hello server started right now!');

//for verifying signin functionality
app.post('/checksignin',home.checksignin);

//for posting values into database

app.post('/userregistration',home.checksignup);


//for posting user bid values

app.post('/userbid',home.postUserBid);

//logout


//posting add by user
app.post('/postadd',home.postAdd);

//posting orders into database
app.post('/postorder',home.postOrder);

app.get('/logout',routes.logout);


//directly displaying signin page
app.get('/',routes.index);


//loading homepage

app.get('/loadhomepage',home.homePageLoad);


//testing homepage

app.get('/homepage',routes.redirectToHomepage);


//loading previous orders

app.get('/retrieveOrders',home.getOrders);


//loading sold products

app.get('/getSoldProducts',home.getsoldProducts);


app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
