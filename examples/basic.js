'use strict';

const RestClient = require('restify-rest-client');

const options = {
  restify: {
    url: 'https://api.example.org'
  }
};

const restClient = new RestClient(options);
restClient.get('/users/100/groups', (err, req, res, body) => {
  if (err) {
    return console.error(err); // eslint-disable-line no-console
  }

  console.log('body: %s', JSON.stringify(body)); // eslint-disable-line no-console
});
