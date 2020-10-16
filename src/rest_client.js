'use strict';

const EventEmitter = require('events');
const restify = require('restify-clients');
const hooker = require('hooker');
const debug = require('debug')('restify-rest-client');
const DefaultCredentialsProvider = require('./credentials_providers/default');

const callbackPromise = (resolve, reject) => {
  return function f(err) {
    const args = Array.prototype.slice.call(arguments, f.length);

    if (err) {
      reject(err);
    } else {
      // eslint-disable-next-line no-useless-call
      resolve.apply(null, [args]);
    }
  };
};

class RestClient extends EventEmitter {
  constructor(options) {
    super();

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

  get(url, callback) {
    debug('get: %s', url);

    let promise;

    if (!callback && typeof Promise === 'function') {
      promise = new Promise((resolve, reject) => {
        callback = callbackPromise(resolve, reject);
      });
    }

    this.client.get(url, callback);

    return promise;
  }

  post(url, data, callback) {
    debug('post: %s', url);

    let promise;

    if (typeof data === 'function') {
      callback = data;
      data = null;
    }

    debug('data: %s', data ? JSON.stringify(data) : '');

    if (!callback && typeof Promise === 'function') {
      promise = new Promise((resolve, reject) => {
        callback = callbackPromise(resolve, reject);
      });
    }

    this.client.post(url, data || {}, callback);

    return promise;
  }

  put(url, data, callback) {
    debug('put: %s', url);

    let promise;

    if (typeof data === 'function') {
      callback = data;
      data = null;
    }

    debug('data: %s', data ? JSON.stringify(data) : '');

    if (!callback && typeof Promise === 'function') {
      promise = new Promise((resolve, reject) => {
        callback = callbackPromise(resolve, reject);
      });
    }

    this.client.put(url, data || {}, callback);

    return promise;
  }

  patch(url, data, callback) {
    debug('patch: %s', url);

    let promise;

    if (typeof data === 'function') {
      callback = data;
      data = null;
    }

    debug('data: %s', data ? JSON.stringify(data) : '');

    if (!callback && typeof Promise === 'function') {
      promise = new Promise((resolve, reject) => {
        callback = callbackPromise(resolve, reject);
      });
    }

    this.client.patch(url, data || {}, callback);

    return promise;
  }

  del(url, callback) {
    debug('del: %s', url);

    let promise;

    if (!callback && typeof Promise === 'function') {
      promise = new Promise((resolve, reject) => {
        callback = callbackPromise(resolve, reject);
      });
    }

    this.client.del(url, callback);

    return promise;
  }

  destroy() {
    debug('destroy');

    hooker.unhook(this.client);
    this.client.close();
    this.client = null;
    this.options = null;
    this.credentialsProvider = null;
  }
}

module.exports = RestClient;
