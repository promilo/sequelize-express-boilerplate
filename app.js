var express = require('express');
var app = express();
var volleyball = require('volleyball')
var bodyParser = require('body-parser');
var puppies = require('./puppies');


app.use(volleyball)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/puppies', function(req, res, next) {
  res.send(puppies);
})

app.get('/puppies/:id', function(req, res, next) {
  var id = req.params.id;
  var query = req.query;
  var puppy = puppies[id];
  console.log(Object.keys(query).length);
  var isEmptyQuery = Object.keys(query).length;
  if (!isEmptyQuery) {
    res.send(puppy)
  } else {
      var responses = {}
      Object.keys(query).forEach(function (key) {
        responses[key] = puppy[key]
      })
    res.send(responses);
  }
})

app.post('/puppies', function(req, res, next) {
  var puppy = req.body;
  console.log("puppy req.body", puppy);
  puppies.push(puppy);
  console.log(puppies)
  res.send(puppy)
})

app.use('*', function(req, res, next) {
  res.send('this is the default route so you missed all of the other routes')
})

var server = app.listen(4000, function () {
    console.log('listening on port', server.address().port)
})
