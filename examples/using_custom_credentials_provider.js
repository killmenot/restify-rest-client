'use strict';

var RestClient = require('restify-rest-client');
var CustomCredentialsProvider = require('./custom_credentials_provider');

var auth = {
  username: 'admin',
  password: 'secret'
};

var options = {
  credentialsProvider: new CustomCredentialsProvider(auth),
  restify: {
    url: 'https://api.example.org'
  }
};

var restClient = new RestClient(options);
restClient.get('/protected-url', function (err, req, res, body) {
  if (err) {
    return console.error(err);
  }

  console.log('body: %s', JSON.stringify(body));
});
