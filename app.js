/* jshint node: true */

'use strict';

var express = require('express');
var path = require('path');
var body_parser = require('body-parser');
var http = require('http');
var request = require('request');

var app = express();

// movie DB API key
var api_key = 'f073217cc9ebdffe91577b5c969ac1a3';


// view engine setup
app.set('view engine', 'jade');
app.set('views', './views');

app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// routing
app.get('/', function(req, res) {
  res.render('index');
});

app.get('/search', function(req, res) {
  
  // search drama title
  var search_title = req.param('search_title'); 

  request({
    method: 'GET',
    url: 'http://api.themoviedb.org/3/search/tv?query=' + search_title + '&api_key=' + api_key, 
    headers: {
      'Accept':'application/json'
    }}, function (error, response, body){

      if(!error && response.statusCode === 200){

        body = JSON.parse(body);

        res.set('Content-Type','application/json');
        res.send(JSON.stringify(body));

        //res.json(body); // object 객체를 json으로 변경해서 전달하는 함수

      } else {
        res.send('bad request, search drama title !!');
      }

    });
});

app.get('/detail', function(req,res) {
  
  //search drama and choice title  
  var search_id = req.param('id');
  console.log(search_id);
  request({
    method: 'GET',
    url: 'http://api.themoviedb.org/3/tv/' + search_id + '?api_key=' + api_key,
    headers: {
      'Accept': 'application/json'
    }}, function(error, response, body){
      
      if (!error && response.statusCode === 200) {

        body = JSON.parse(body);
        res.json(body);

      } else {
        res.send('error id request');
      }
    });
});

app.listen(3005, function() {
  console.log('Connected 3005');
});

