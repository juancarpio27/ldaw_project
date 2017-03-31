var express = require('express');
var router = express.Router();
var controller = require('../controllers/users');

router.get('/:id',controller.show);
router.post('/',controller.create);
router.patch('/:id',controller.update);
router.get('/:id/interested',controller.interested);
router.delete('/:id',controller.destroy);

module.exports = router;