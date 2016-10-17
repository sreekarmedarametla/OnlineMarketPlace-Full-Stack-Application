var express = require('express');
var winston=require('winston');

var logger1 = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: './bi' +
        'n/logs/a.log' })
    ]
});

/* GET signin page. */
exports.index=function(req,res){
  res.render('login',{title:'welcome to ebay'});
}

//after signing in letting the user to enter into homepage
exports.redirectToHomepage=function(req,res){
    if(req.session.userid) {
        res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        res.render('index');
    }
    else{

        res.redirect('/');
    }
}

exports.logout=function(req,res){
    console.log("in logout page");
    req.session.destroy();
    logger1.log('info',"User signining Out");
    res.send('logout');
}
