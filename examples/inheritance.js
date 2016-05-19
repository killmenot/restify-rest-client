var RestClient = require('restify-rest-client');
var util = require('util');

var options = {
  restify: {
    url: 'https://api.example.org'
  }
};

function ExampleRestClient() {
  RestClient.apply(this, arguments);
}

util.inherits(ExampleRestClient, RestClient);

ExampleRestClient.prototype.getUserGroups = function (userId, cb) {
  this.get('/users/' + userId + '/group', function (err, req, res, body) {
    cb(err, body);
  });
};

var restClient = new ExampleRestClient(options);
restClient.getUserGroups(200, function (err, body) {
  if (err) {
    return console.error(err);
  }

  console.log('body: %s', JSON.stringify(body));
});
