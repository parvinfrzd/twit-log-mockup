var Users = require('../models/user');
var Tweets = require('../models/tweet');
const Twit = require('twit');

var client = new Twit({
    consumer_key: process.env.API_KEY,
    consumer_secret: process.env.API_SECRET_KEY,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

async function searchTwitter(req, res) {
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
            title: 'Search Twitter',
        });
}

function searchTrends(req, res) {
    res.render('search/trend',
        {
            Users,
            user: req.user,
            name: req.query.name,
            title: 'Find Twitter Trends',
        });
}

module.exports = {
    search: searchTwitter,
    searchTrends,
}