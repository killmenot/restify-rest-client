'use strict';

function CustomCredentialsProvider(auth) {
  this.auth = auth;
  this.name = 'basicAuth';
}

CustomCredentialsProvider.prototype.pre = function (restClient) {
  restClient.client.basicAuth(this.auth.username, this.auth.password);
};

CustomCredentialsProvider.prototype.post = function (restClient) {
  restClient.client.basicAuth(false);
};
