var express = require('express');
var router = express.Router();
var controller = require('../controllers/category_users');

router.post('/',controller.create);
router.get('/:user_id',controller.get_category_users);
router.delete('/:user_id',controller.delete);

module.exports = router;