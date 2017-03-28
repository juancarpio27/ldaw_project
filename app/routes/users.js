var express = require('express');
var router = express.Router();
var controller = require('../controllers/users');

router.get('/:id',controller.show);
router.post('/',controller.create);
router.patch('/:id',controller.update);

module.exports = router;