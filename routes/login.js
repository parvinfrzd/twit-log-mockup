var express = require('express');
var router = express.Router();
var loginCtrl = require('../controllers/login');
/* GET users listing. */
router.get('/login', loginCtrl.index);

module.exports = router;
