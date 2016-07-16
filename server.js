var express = require('express');
var app = express();
var fs = require('fs');
var querystring = require('querystring');
var bodyParser = require('body-parser');
var pug = require('pug');
var path = require('path');
var Gallery = require('./Gallery');

app.set(path.resolve(__dirname, 'views'), 'views');
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/gallery/new', function (req, res) {
  res.send('Placeholder');
});

app.get('/gallery/:id', function (req, res, next) {
  var id = parseInt(req.params.id);
  Gallery.find(id, function (err, result) {
    if (err) {
      return next(err);
    }
    res.render('gallery', result);
  });
});

app.post('/gallery', function (req, res, next) {
  var locals = req.body;
  Gallery.add(locals, function (err, result) {
    if (err) {
      return next(err);
    }
    res.render('gallery', result.data);
  });
});

app.get('/gallery/:id/edit', function (req, res, next) {
  var id = parseInt(req.params.id);
  Gallery.find(id, function (err, result) {
    if (err) {
      return next(err);
    }
    res.send('Captain Placeholder');
  });
});

app.put('/gallery/:id', function (req, res, next) {
  var id = parseInt(req.params.id);
  var locals = req.body;
  Gallery.edit(id, locals, function (err, result) {
    if (err) {
      return next(err);
    }
    res.render('gallery', result);
  });
});

app.use(function (err, req, res, next) {
  console.log('404!');
  res.status(400).send(err.message);
});

app.use(function (err, req, res, next) {
  res.status(err.statusCode || 500).json({
      message: err.message
  });
  console.log('blabjlkafsds');
});

var server = app.listen(8080, function () {
  console.log('Connected');
});