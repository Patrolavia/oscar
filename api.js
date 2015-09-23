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

router.get('/api/pad/0', function(req, res) {
  res.json(apis.pad[0]);
});

router.get('/api/pad/1', function(req, res) {
  res.json(apis.pad[1]);
});

router.get('/api/pad/2', function(req, res) {
  res.json(apis.pad[2]);
});

router.get('/api/pad/3', function(req, res) {
  res.json(apis.pad[3]);
});

router.get('/api/whale', function(req, res) {
  res.json(apis.whale);
});

router.get('/api/me', function(req, res) {
  res.json(apis.me);
});

router.get('/api/paths', function(req, res) {
  res.json(apis.paths);
});

module.exports = router;
