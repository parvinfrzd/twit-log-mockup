var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/new', function addTweet(req, res) {
  res.render('tweets/new', { title: 'Add New Tweet' })
});

module.exports = router;
