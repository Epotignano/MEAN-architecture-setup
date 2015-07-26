'use strict';

var express = require('express');
var controller = require('./yahoo-search.controller');

var router = express.Router();

router.get('/', controller.search);

module.exports = router;
