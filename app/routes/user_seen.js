var express = require('express');
var router = express.Router();
var controller = require('../controllers/user_seen');

router.post('/',controller.create);

module.exports = router;