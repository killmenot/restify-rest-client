'use strict';

var restify = require('restify');
var hooker = require('hooker');
var DefaultCredentialsProvider = require('./credentials_providers/default');

function RestClient(options) {
  var self = this;

  this.options = options || {};
  this.client = restify.createJsonClient(options.restify || {});
  this.credentialsProvider = options.credentialsProvider || new DefaultCredentialsProvider();

  hooker.hook(this.client, ['get', 'put', 'del', 'post'], {
    pre: function () {
      self.credentialsProvider.pre(self);
    },
    post: function () {
      self.credentialsProvider.post(self);
    }
  });
}

RestClient.prototype.get = function (url, cb) {
  this.client.get(url, cb);
};

RestClient.prototype.post = function (url, data, cb) {
  if (typeof data === 'function') {
    cb = data;
    data = {};
  }
  this.client.post(url, data, cb);
};

RestClient.prototype.put = function (url, data, cb) {
  if (typeof data === 'function') {
    cb = data;
    data = {};
  }
  this.client.put(url, data, cb);
};

RestClient.prototype.del = function (url, cb) {
  this.client.del(url, cb);
};

RestClient.prototype.destroy = function () {
  hooker.unhook(this.client);
  this.client.close();
  this.client = null;
  this.options = null;
  this.credentialsProvider = null;
};

module.exports = RestClient;
