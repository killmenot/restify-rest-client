'use strict';

var RestClient = require('./lib/rest_client');
var DefaultCredentialsProvider = require('./lib/credentials_providers/default');

module.exports.RestClient = RestClient;
module.exports.DefaultCredentialsProvider = DefaultCredentialsProvider;
