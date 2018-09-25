'use strict';

const RestClient = require('restify-rest-client');
const CustomCredentialsProvider = require('./custom_credentials_provider');

const auth = {
  username: 'admin',
  password: 'secret'
};
const options = {
  credentialsProvider: new CustomCredentialsProvider(auth),
  restify: {
    url: 'https://api.example.org'
  }
};
const restClient = new RestClient(options);
restClient.get('/protected-url', (err, req, res, body) => {
  if (err) {
    return console.error(err); // eslint-disable-line no-console
  }

  console.log('body: %s', JSON.stringify(body)); // eslint-disable-line no-console
});
