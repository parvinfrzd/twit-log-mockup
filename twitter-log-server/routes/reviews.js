var express = require('express');
var router = express.Router();
var Tweets = require('../models/tweet');


function create(req, res) {
    Tweets.findById(req.params.id, function (err, tweet) {
        tweet.reviews.push(req.body);
        tweet.save(function (err) {
            res.redirect(`/tweets/${tweet._id}`);
        });
    });
}

router.post('/tweets/:id/reviews', function create(req, res) {
    Tweets.findById(req.params.id, function (err, tweet) {
        tweet.reviews.push(req.body);
        tweet.save(function (err) {
            res.redirect(`/tweets/${tweet._id}`);
        });
    });
});

module.exports = router;