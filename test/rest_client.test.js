/* globals before, after, beforeEach, afterEach, describe, it */

'use strict';

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var restify = require('restify');
var server = require('./utils/server');
var RestClient = require('../').RestClient;
var DefaultCredentialsProvider = require('../').DefaultCredentialsProvider;

chai.use(sinonChai);

describe('RestClient', function () {
  var restClient;
  var sandbox;
  var port = process.env.PORT || 10000;
  var options = {
    restify: {
      url: 'http://localhost:' + port
    }
  };
  var payload = {
    data: 'foo'
  };

  before(function (done) {
      server.listen(port, function () {
        restClient = new RestClient(options);
        done();
      });
  });

  after(function () {
    server.close();
  });

  beforeEach(function () {
    sandbox = sinon.sandbox.create();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('should be defined', function () {
    expect(RestClient).to.be.a('function');
  });

  it('should have options defined', function () {
    expect(restClient.options).to.be.an('object');
  });

  it('should have client defined', function () {
    expect(restClient.client).to.be.an.instanceof(restify.JsonClient);
  });

  it('should have credentialsProvider defined', function () {
    expect(restClient.credentialsProvider).to.be.an.instanceof(DefaultCredentialsProvider);
  });

  describe('hooks', function () {
    var preSpy;
    var postSpy;

    beforeEach(function () {
      preSpy = sandbox.spy(restClient.credentialsProvider, 'pre');
      postSpy = sandbox.spy(restClient.credentialsProvider, 'post');
    });

    it('#get', function (done) {
      restClient.get('/api/v1/resources', function () {
        expect(preSpy).to.be.calledWith(restClient);
        expect(postSpy).to.be.calledWith(restClient);
        done();
      });
    });

    it('#post', function (done) {
      var data = {};
      restClient.post('/api/v1/resources', data, function () {
        expect(preSpy).to.be.calledWith(restClient);
        expect(postSpy).to.be.calledWith(restClient);
        done();
      });
    });

    it('#put', function (done) {
      var data = {};
      restClient.put('/api/v1/resource/foos', data, function () {
        expect(preSpy).to.be.calledWith(restClient);
        expect(postSpy).to.be.calledWith(restClient);
        done();
      });
    });

    it('#del', function (done) {
      restClient.del('/api/v1/resources/bar', function () {
        expect(preSpy).to.be.calledWith(restClient);
        expect(postSpy).to.be.calledWith(restClient);
        done();
      });
    });
  });

  describe('#get', function () {
    beforeEach(function () {
      sandbox = sinon.sandbox.create();
    });

    it('should be defined', function () {
      expect(restClient.get).to.be.a('function');
    });

    it('should send request', function (done) {
      restClient.get('/api/v1/resources', function (err, req, res, body) {
        expect(body).to.eql({
          data: 'no data'
        });
        done();
      });
    });
  });

  describe('#post', function () {
    it('should be defined', function () {
      expect(restClient.post).to.be.a('function');
    });

    it('should send request with data', function (done) {
      restClient.post('/api/v1/resources', payload, function (err, req, res, body) {
        expect(body).to.eql({
          data: 'foo'
        });
        done();
      });
    });

    it('should send request without data', function (done) {
      restClient.post('/api/v1/resources', function (err, req, res, body) {
        expect(body).to.eql({
          data: 'no data'
        });
        done();
      });
    });
  });

  describe('#put', function () {
    it('should be defined', function () {
      expect(restClient.put).to.be.a('function');
    });

    it('should send request with data', function (done) {
      restClient.put('/api/v1/resources/bar', payload, function (err, req, res, body) {
        expect(body).to.eql({
          data: 'foo'
        });
        done();
      });
    });

    it('should send request without data', function (done) {
      restClient.put('/api/v1/resources/bar', function (err, req, res, body) {
        expect(body).to.eql({
          data: 'no data'
        });
        done();
      });
    });
  });

  describe('#del', function () {
    it('should be defined', function () {
      expect(restClient.del).to.be.a('function');
    });

    it('should send request', function (done) {
      restClient.del('/api/v1/resources/bar', function (err, req, res, body) {
        expect(body).to.eql({
          data: 'no data'
        });
        done();
      });
    });
  });

  describe('#destroy', function () {
    it('should be defined', function () {
      expect(restClient.destroy).to.be.a('function');
    });
  });
});
