var RestClient = require('restify-rest-client');
var options = {
  restify: {
    url: 'https://api.example.org'
  }
};

var restClient = new RestClient(options);
restClient.get('/users/100/groups', function (err, req, res, body) {
  if (err) {
    return console.error(err);
  }

  console.log('body: %s', JSON.stringify(body));
});
