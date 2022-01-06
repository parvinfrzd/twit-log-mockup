var express = require('express');
var router = express.Router();
var Tweets = require('../models/tweet');


router.post('/tweets/:id/reviews', function create(req, res) {
    Tweets.findById(req.params.id, function (err, tweet) {
        console.log(req.body)
        tweet.reviews.push(req.body);
        tweet.save(function (err) {
            console.log('pushed to reviews')
            res.redirect(`/tweets/${tweet._id}`);
        });
    });
});

module.exports = router;