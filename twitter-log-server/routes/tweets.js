var express = require('express');
var router = express.Router();
var Tweets = require('../models/tweet');
var Users = require('../models/user');

/* GET users listing. */
router.get('/new', function addTweet(req, res) {
  res.render('tweets/new', {
    title: 'Add New Tweet',
    Users,
    user: req.user,
    name: req.query.name,
  })
});

router.get('/', function showTweet(req, res) {
  Tweets.find({}, function (err, tweets) {
    res.render('tweets/index', {
      title: 'All Tweets',
      tweets,
      Users,
      user: req.user,
      name: req.query.name,
    })
  })
});

router.get('/:id', function show(req, res) {
  Tweets.findById(req.params.id)
    .populate('tweets').exec(function (err, tweet) {
      console.log(tweet);
      res.render('tweets/show', {
        title: 'Tweet Detail', tweet
      });
    });
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
