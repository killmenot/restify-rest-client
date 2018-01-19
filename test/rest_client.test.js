/* globals before, after, beforeEach, afterEach, describe, it */

'use strict';

const EventEmitter = require('events');
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const restifyClients = require('restify-clients');
const server = require('./utils/server');
const RestClient = require('../').RestClient;
const DefaultCredentialsProvider = require('../').DefaultCredentialsProvider;

chai.use(sinonChai);

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
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
    });

    it('should be defined', () => {
      expect(restClient.get).to.be.a('function');
    });

    it('should send request', (done) => {
      restClient.get('/api/v1/resources', function (err, req, res, body) {
        expect(body).to.eql({
          data: 'no data'
        });
        done();
      });
    });
  });

  describe('#post', () => {
    it('should be defined', () => {
      expect(restClient.post).to.be.a('function');
    });

    it('should send request with data', (done) => {
      restClient.post('/api/v1/resources', payload, function (err, req, res, body) {
        expect(body).to.eql({
          data: 'foo'
        });
        done();
      });
    });

    it('should send request without data', (done) => {
      restClient.post('/api/v1/resources', function (err, req, res, body) {
        expect(body).to.eql({
          data: 'no data'
        });
        done();
      });
    });
  });

  describe('#put', () => {
    it('should be defined', () => {
      expect(restClient.put).to.be.a('function');
    });

    it('should send request with data', (done) => {
      restClient.put('/api/v1/resources/bar', payload, function (err, req, res, body) {
        expect(body).to.eql({
          data: 'foo'
        });
        done();
      });
    });

    it('should send request without data', (done) => {
      restClient.put('/api/v1/resources/bar', function (err, req, res, body) {
        expect(body).to.eql({
          data: 'no data'
        });
        done();
      });
    });
  });

  describe('#patch', () => {
    it('should be defined', () => {
      expect(restClient.patch).to.be.a('function');
    });

    it('should send request with data', (done) => {
      restClient.patch('/api/v1/resources/bar', payload, function (err, req, res, body) {
        expect(body).to.eql({
          data: 'foo'
        });
        done();
      });
    });

    it('should send request without data', (done) => {
      restClient.patch('/api/v1/resources/bar', function (err, req, res, body) {
        expect(body).to.eql({
          data: 'no data'
        });
        done();
      });
    });
  });

  describe('#del', () => {
    it('should be defined', () => {
      expect(restClient.del).to.be.a('function');
    });

    it('should send request', (done) => {
      restClient.del('/api/v1/resources/bar', function (err, req, res, body) {
        expect(body).to.eql({
          data: 'no data'
        });
        done();
      });
    });
  });

  describe('#destroy', () => {
    it('should be defined', () => {
      expect(restClient.destroy).to.be.a('function');
    });

    it('should destroy object', () => {
      restClient.destroy();

      expect(restClient.client).equal(null);
      expect(restClient.options).equal(null);
      expect(restClient.credentialsProvider).equal(null);
    });
  });
});
