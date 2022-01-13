var express = require('express');
var router = express.Router();
const searchCtrl = require('../controllers/search');

router.get('/search', searchCtrl.search);
router.get('/trends', searchCtrl.searchTrends);

module.exports = router;