var express = require('express');
var router = express.Router();
var controller = require('../controllers/sessions');

router.post('/',controller.create);
router.delete('/',controller.destroy);
router.post('/admin',controller.create_admin);
router.delete('/admin',controller.destroy_admin);

module.exports = router;