var express = require('express');
var router = express.Router();
var controller = require('../controllers/index');

router.get('/',controller.home);

module.exports = router;