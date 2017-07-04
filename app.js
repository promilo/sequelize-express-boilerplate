var express = require('express');
var app = express();
var volleyball = require('volleyball')
var bodyParser = require('body-parser');
var puppies = require('./puppies');
var puppiesRouter = require('./puppiesRouter')
var path = require('path')


app.use(volleyball)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname,'public')))

app.use('/puppies', puppiesRouter)

app.use('*', function(req, res, next) {
  res.send('this is the default route so you missed all of the other routes')
})

var server = app.listen(4000, function () {
    console.log('listening on port', server.address().port)
})
