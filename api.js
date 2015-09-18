'use strict';

var mock = require('mockjs');
var express = require('express');
var router = express.Router();

var apis = require('./apis');

router.get('/api/pads', function(req, res) {
  res.json(apis.pads);
});

router.get('/api/users', function(req, res) {
  res.json(apis.users);
});

module.exports = router;
