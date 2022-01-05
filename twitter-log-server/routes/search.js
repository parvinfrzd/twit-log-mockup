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


router.get('/search', async (req, res, next) => {

    if (req.query.hashtag && req.query.count) {
        await client.get('search/tweets', { q: `#${req.query.hashtag} since:2020-04-15`, count: req.query.count }, function (err, data, response) {
            var result = data.statuses
            //use array.map to filter the data and add to database at once
            result.forEach(r => {
                const tweet = new Tweets({
                    tweet: r.text,
                    createdAt: r.created_at,
                    author: r.user.screen_name,
                    bio: r.user.description,
                    hashtag: `#${req.query.hashtag}`,
                });
                tweet.save(function (error) {
                    if (error) {
                        console.log(error);
                    }
                });
            });
            res.redirect('/tweets');
        });
    }
    res.render('search/index',
        {
            Users,
            user: req.user,
            name: req.query.name,
            title: 'Search Tweet Feels',
        });

});

module.exports = router;