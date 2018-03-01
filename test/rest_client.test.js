/* globals before, after, beforeEach, afterEach, describe, it */

'use strict';

const EventEmitter = require('events');
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const restifyClients = require('restify-clients');
const server = require('./utils/server');
const RestClient = require('../src').RestClient;
const DefaultCredentialsProvider = require('../src').DefaultCredentialsProvider;

chai.use(require('sinon-chai'));
require('promise-spread')(Promise);

describe('RestClient', () => {
  let restClient;
  let sandbox;
  let port = process.env.PORT || 10000;

  const options = {
    restify: {
      url: 'http://localhost:' + port
    }
  };
  const payload = {
    data: 'foo'
  };

  before((done) => {
    server.listen(port, () => {
      restClient = new RestClient(options);
      done();
    });
  });

  after(() => {
    server.close();
  });

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should be defined', () => {
    expect(RestClient).to.be.a('function');
    
  });

  it('should be instance of event emitter', () => {
    expect(restClient).to.be.an.instanceof(EventEmitter);
  });

  it('should have options defined', () => {
    expect(restClient.options).to.be.an('object');
  });

  it('should have client defined', () => {
    expect(restClient.client).to.be.an.instanceof(restifyClients.JsonClient);
  });

  it('should have credentialsProvider defined', () => {
    expect(restClient.credentialsProvider).to.be.an.instanceof(DefaultCredentialsProvider);
  });

  describe('hooks', () => {
    let preSpy;
    let postSpy;

    beforeEach(() => {
      preSpy = sandbox.spy(restClient.credentialsProvider, 'pre');
      postSpy = sandbox.spy(restClient.credentialsProvider, 'post');
    });

    it('#get', (done) => {
      restClient.get('/api/v1/resources', () => {
        expect(preSpy).to.be.calledWith(restClient);
        expect(postSpy).to.be.calledWith(restClient);
        done();
      });
    });

    it('#post', (done) => {
      const data = {};
      restClient.post('/api/v1/resources', data, () => {
        expect(preSpy).to.be.calledWith(restClient);
        expect(postSpy).to.be.calledWith(restClient);
        done();
      });
    });

    it('#put', (done) => {
      const data = {};
      restClient.put('/api/v1/resource/foos', data, () => {
        expect(preSpy).to.be.calledWith(restClient);
        expect(postSpy).to.be.calledWith(restClient);
        done();
      });
    });

    it('#patch', (done) => {
      const data = {};
      restClient.patch('/api/v1/resource/foos', data, () => {
        expect(preSpy).to.be.calledWith(restClient);
        expect(postSpy).to.be.calledWith(restClient);
        done();
      });
    });

    it('#del', (done) => {
      restClient.del('/api/v1/resources/bar', () => {
        expect(preSpy).to.be.calledWith(restClient);
        expect(postSpy).to.be.calledWith(restClient);
        done();
      });
    });
  });

  describe('#get', () => {
    it('should send GET request (callback)', (done) => {
      restClient.get('/api/v1/resources', function (err, req, res, body) {
        expect(body).to.eql({
          data: 'no data'
        });
        done();
      });
    });

    it('should send GET request (promise)', (done) => {
      restClient.get('/api/v1/resources').spread((req, res, body) => {
        expect(body).to.eql({
          data: 'no data'
        });
        done();
      });
    });
  });

  describe('#post', () => {
    it('should send POST request with data (callback)', (done) => {
      restClient.post('/api/v1/resources', payload, function (err, req, res, body) {
        expect(body).to.eql({
          data: 'foo'
        });
        done();
      });
    });

    it('should send POST request with data (promise)', (done) => {
      restClient.post('/api/v1/resources', payload).spread((req, res, body) => {
        expect(body).to.eql({
          data: 'foo'
        });
        done();
      });
    });

    it('should send POST request without data (callback)', (done) => {
      restClient.post('/api/v1/resources', function (err, req, res, body) {
        expect(body).to.eql({
          data: 'no data'
        });
        done();
      });
    });

    it('should send POST request without data (promise)', (done) => {
      restClient.post('/api/v1/resources').spread((req, res, body) => {
        expect(body).to.eql({
          data: 'no data'
        });
        done();
      });
    });
  });

  describe('#put', () => {
    it('should send PUT request with data (callback)', (done) => {
      restClient.put('/api/v1/resources/bar', payload, function (err, req, res, body) {
        expect(body).to.eql({
          data: 'foo'
        });
        done();
      });
    });

    it('should send PUT request with data (promise)', (done) => {
      restClient.put('/api/v1/resources/bar', payload).spread((req, res, body) => {
        expect(body).to.eql({
          data: 'foo'
        });
        done();
      });
    });

    it('should send PUT request without data (callback)', (done) => {
      restClient.put('/api/v1/resources/bar', function (err, req, res, body) {
        expect(body).to.eql({
          data: 'no data'
        });
        done();
      });
    });

    it('should send PUT request without data (promise)', (done) => {
      restClient.put('/api/v1/resources/bar').spread((req, res, body) => {
        expect(body).to.eql({
          data: 'no data'
        });
        done();
      });
    });
  });

  describe('#patch', () => {
    it('should send PATCH request with data (callback)', (done) => {
      restClient.patch('/api/v1/resources/bar', payload, function (err, req, res, body) {
        expect(body).to.eql({
          data: 'foo'
        });
        done();
      });
    });

    it('should send PATCH request with data (promise)', (done) => {
      restClient.patch('/api/v1/resources/bar', payload).spread((req, res, body) => {
        expect(body).to.eql({
          data: 'foo'
        });
        done();
      });
    });

    it('should send PATCH request without data (callback)', (done) => {
      restClient.patch('/api/v1/resources/bar', function (err, req, res, body) {
        expect(body).to.eql({
          data: 'no data'
        });
        done();
      });
    });

    it('should send PATCHrequest without data (promise)', (done) => {
      restClient.patch('/api/v1/resources/bar').spread((req, res, body) => {
        expect(body).to.eql({
          data: 'no data'
        });
        done();
      });
    });
  });

  describe('#del', () => {
    it('should send DELETE request (callback)', (done) => {
      restClient.del('/api/v1/resources/bar', function (err, req, res, body) {
        expect(body).to.eql({
          data: 'no data'
        });
        done();
      });
    });

    it('should send DELETE request (promise)', (done) => {
      restClient.del('/api/v1/resources/bar').spread((req, res, body) => {
        expect(body).to.eql({
          data: 'no data'
        });
        done();
      });
    });
  });

  describe('#destroy', () => {
    it('should destroy object', () => {
      restClient.destroy();

      expect(restClient.client).equal(null);
      expect(restClient.options).equal(null);
      expect(restClient.credentialsProvider).equal(null);
    });
  });
});
