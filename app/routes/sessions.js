var express = require('express');
var router = express.Router();
var controller = require('../controllers/sessions');

router.post('/',controller.create);

module.exports = router;