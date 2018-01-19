'use strict';

const EventEmitter = require('events');
const util = require('util');
const restify = require('restify-clients');
const hooker = require('hooker');
const DefaultCredentialsProvider = require('./credentials_providers/default');

function RestClient(options) {
  EventEmitter.call(this);

  this.options = options || {};
  this.client = restify.createJsonClient(options.restify || {});
  this.credentialsProvider = options.credentialsProvider || new DefaultCredentialsProvider();

  hooker.hook(this.client, ['get', 'put', 'del', 'post', 'patch'], {
    pre: () => {
      this.credentialsProvider.pre(this);
    },
    post: () => {
      this.credentialsProvider.post(this);
    }
  });
}

util.inherits(RestClient, EventEmitter);

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

RestClient.prototype.patch = function (url, data, cb) {
  if (typeof data === 'function') {
    cb = data;
    data = {};
  }
  this.client.patch(url, data, cb);
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
