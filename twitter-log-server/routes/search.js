var express = require('express');
var router = express.Router();
var Users = require('../models/user');
var Tweets = require('../models/tweet');
const Twit = require('twit');

var client = new Twit({
    consumer_key: process.env.API_KEY,
    consumer_secret: process.env.API_SECRET_KEY,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});


/* GET home page. */
router.get('/search', async (req, res, next) => {
    res.render('search/index',
        {
            Users,
            user: req.user,
            name: req.query.name,
            title: 'Search Tweet Feels',
        });
    if (req.query.hashtag && req.query.count) {
        await client.get('search/tweets', { q: `#${req.query.hashtag} since:2020-04-15`, count: req.query.count }, function (err, data, response) {
            var result = data.statuses
            result.forEach(r => {
                console.log(r.screen_name)
                const tweet = new Tweets({
                    tweet: r.text,
                    createdAt: r.created_at,
                    author: r.user.screen_name,
                    bio: r.user.description,
                    hashtag: `#${req.query.hashtag}`,
                });
                tweet.save(function (error) {
                    // res.redirect('tweets');
                    if (error) {
                        console.log(error);
                    }
                });
            })
        });
    }
    else {
        //ALERT TO COMPLETE THE FORM 
    }

    // console.log(tweet_results)

});

module.exports = router;



            // const tweets = data.statuses.map(tweet => tweet.text)
            // const time = data.statuses.map(tweet => tweet.created_at)
            // const username = data.statuses.map(tweet => tweet.user.screen_name)
            // const bio = data.statuses.map(tweet => tweet.user.description)
            // res.render('index', {
            //     tweets, time, username, bio,
            //     Users,
            //     user: req.user,
            //     name: req.query.name,
            //     title: 'Search Tweet Feels',
            // });