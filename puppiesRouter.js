var router = require('express').Router()

var puppies = require('./puppies');

module.exports = router;

router.get('/', function(req, res, next) {
  res.send(puppies);
})

router.put('/:id', function(req, res, next) {
  var puppy = puppies[req.params.id]
  Object.assign(puppy, req.body);
  res.send(puppy);
})

router.get('/:id', function(req, res, next) {
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

router.post('/', function(req, res, next) {
  var puppy = req.body;
  console.log("puppy req.body", puppy);
  puppies.push(puppy);
  console.log(puppies)
  res.send(puppy)
})

// dummy route if we had sequelize

router.get("/:id/orders/:orderId", function(req, res, next) {
  puppies.findById()
    .then(function(puppy) {
      return puppy.getAllOders({
        where: {
          orderId: req.params.orderId
        }
      })
    })
})
