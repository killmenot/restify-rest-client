'use strict';

function DefaultCredentialsProvider() {
    this.name = 'default';
}

DefaultCredentialsProvider.prototype.pre = function () {
};

DefaultCredentialsProvider.prototype.post = function () {};

module.exports = DefaultCredentialsProvider;
