/* globals beforeEach, describe, it */

'use strict';

var path = require('path');
var DefaultCredentialsProvider = require(path.join(process.cwd(), '/')).DefaultCredentialsProvider;
var expect = require('chai').expect;

describe('DefaultCredentialsProvider', function () {
  var credentialsProvider;

  beforeEach(function () {
    credentialsProvider = new DefaultCredentialsProvider();
  });

  it('should be defined', function () {
    expect(DefaultCredentialsProvider).to.be.a('function');
  });

  it('should have name', function () {
    expect(credentialsProvider.name).to.equal('default');
  });

  describe('#pre', function () {
    it('should be defined', function () {
      expect(credentialsProvider.pre).to.be.a('function');
    });
  });

  describe('#post', function () {
    it('should be defined', function () {
      expect(credentialsProvider.pre).to.be.a('function');
    });
  });
});
