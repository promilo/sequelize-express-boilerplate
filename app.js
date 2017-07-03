var express = require('express');
var app = express();

var volleyball = require('volleyball')
app.use(volleyball)

var server = app.listen(3000, function () {
    console.log('listening on port', server.address().port)
})