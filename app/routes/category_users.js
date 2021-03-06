var express = require('express');
var router = express.Router();
var controller = require('../controllers/category_users');

router.post('/',controller.create);
router.get('/:user_id',controller.get_category_users);
router.post('/:user_id/delete',controller.delete);
router.post('/:user_id/bloom',controller.calculate_bloom);

module.exports = router;