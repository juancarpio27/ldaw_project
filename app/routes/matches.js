var express = require('express');
var router = express.Router();
var controller = require('../controllers/matches');

router.get('/:user_id',controller.get_matches);
router.delete('/:user_id',controller.destroy);
router.post('/:id',controller.remove);

module.exports = router;