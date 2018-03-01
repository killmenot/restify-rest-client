/* globals beforeEach, describe, it */

'use strict';

const DefaultCredentialsProvider = require('../../src').DefaultCredentialsProvider;
const expect = require('chai').expect;

describe('DefaultCredentialsProvider', () => {
  let credentialsProvider;

  beforeEach(() => {
    credentialsProvider = new DefaultCredentialsProvider();
  });

  it('should be defined', () => {
    expect(DefaultCredentialsProvider).to.be.a('function');
  });

  it('should have name', () => {
    expect(credentialsProvider.name).to.equal('default');
  });

  describe('#pre', () => {
    it('should be defined', () => {
      expect(credentialsProvider.pre).to.be.a('function');
    });
  });

  describe('#post', () => {
    it('should be defined', () => {
      expect(credentialsProvider.pre).to.be.a('function');
    });
  });
});
