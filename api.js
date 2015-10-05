'use strict';

var _ = require('lodash');
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

router.get('/api/pad/:padId', function(req, res) {
  res.json(apis.pad(req.params.padId));
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

router.post('/api/user', function(req, res) {
  var parameters = JSON.parse(_.keys(req.body)[0])
  var data = apis.user(parameters);
  res.json(data);
});

router.post('/api/edit/:padId', function(req, res) {
  // status code:
  // 0: Success.
  // 1: Not logged in.
  // 2: No such pad.
  // 3: Not cooperator.
  // 4: Failed to save pad.
  // 5: Version not match.
  var parameters = JSON.parse(_.keys(req.body)[0])
  var data = apis.edit(0);
  res.json(data);
});

module.exports = router;
