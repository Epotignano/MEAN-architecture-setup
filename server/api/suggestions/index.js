'use strict';

var express = require('express');
var controller = require('./suggestions.controller');

var router = express.Router();

router.get('/', controller.retrieveSuggestions);
router.post('/', controller.create);

module.exports = router;
