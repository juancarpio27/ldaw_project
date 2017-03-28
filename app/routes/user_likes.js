var express = require('express');
var router = express.Router();
var controller = require('../controllers/user_likes');

router.post('/',controller.create);
router.get('/:user_id',controller.get_user_likes);
router.delete('/:user_id',controller.delete);

module.exports = router;