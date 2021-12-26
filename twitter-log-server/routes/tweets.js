var express = require('express');
var router = express.Router();
var Tweets = require('../models/tweet');

/* GET users listing. */
router.get('/new', function addTweet(req, res) {
  res.render('tweets/new', { title: 'Add New Tweet' })
});

router.get('/', function showTweet(req, res) {
  Tweets.find({}, function (err, tweets) {
    res.render('tweets/index', { title: 'All Tweets', tweets })
  })
});

router.post('/', function createTweet(req, res) {
  req.body.nowShowing = !!req.body.nowShowing;

  const tweet = new Tweets(req.body);
  tweet.save(function (error) {
    res.redirect('tweets');
    if (error) {
      console.log(error);
    }
  });

});
module.exports = router;
