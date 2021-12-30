var express = require('express');
var router = express.Router();
const Users = require('../models/user');
const Twit = require('twit');

var client = new Twit({
    consumer_key: process.env.API_KEY,
    consumer_secret: process.env.API_SECRET_KEY,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});


/* GET home page. */
router.get('/search', async (req, res, next) => {

    await client.get('search/tweets', { q: '#vegan since:2020-04-15', count: 4 }, function (err, data, response) {
        const tweets = data.statuses
            .map(tweet => tweet.text)
        console.log(tweets);
        res.render('search/index',
            {
                Users,
                user: req.user,
                name: req.query.name,
                title: 'Search Tweet Feels',
                tweets,
            });
    });
    // console.log(tweet_results)



});

module.exports = router;