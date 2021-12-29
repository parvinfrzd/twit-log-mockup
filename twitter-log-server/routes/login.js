var express = require('express');
var router = express.Router();
var loginCtrl = require('../controllers/login');
/* GET users listing. */
router.get('/', loginCtrl.index);

module.exports = router;