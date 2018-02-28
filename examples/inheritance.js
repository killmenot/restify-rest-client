'use strict';

const RestClient = require('restify-rest-client');
const util = require('util');

function ExampleRestClient() {
  RestClient.apply(this, arguments);
}

util.inherits(ExampleRestClient, RestClient);

ExampleRestClient.prototype.getUserGroups = function (userId, cb) {
  this.get('/users/' + userId + '/group', (err, req, res, body) => {
    cb(err, body);
  });
};

const options = {
  restify: {
    url: 'https://api.example.org'
  }
};
const restClient = new ExampleRestClient(options);
restClient.getUserGroups(200, (err, body) => {
  if (err) {
    return console.error(err);
  }

  console.log('body: %s', JSON.stringify(body));
});
