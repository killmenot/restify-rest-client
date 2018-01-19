'use strict';

var restify = require('restify');
var bodyParser = require('body-parser');

function respond(req, res, next) {
  res.json({
    data: (req.body || {}).data || 'no data'
  });
  next();
}

var server = restify.createServer();
server.use(bodyParser());

server.get('/api/v1/resources', respond);
server.post('/api/v1/resources', respond);
server.put('/api/v1/resources/:id', respond);
server.patch('/api/v1/resources/:id', respond);
server.del('/api/v1/resources/:id', respond);

module.exports = server;
