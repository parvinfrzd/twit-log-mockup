var Tweets = require('../models/tweet');
var Users = require('../models/user');

function addTweet(req, res) {
    res.render('tweets/new', {
        title: 'Add New Tweet',
        Users,
        user: req.user,
        name: req.query.name,
    });
}

function showTweet(req, res) {
    Tweets.find({}, function (err, tweets) {
        res.render('tweets/index', {
            title: 'All Tweets',
            tweets,
            Users,
            user: req.user,
            name: req.query.name,
        })
    })
}

function show(req, res) {
    Tweets.findById(req.params.id)
        .populate('tweets').exec(function (err, tweet) {
            console.log(tweet);
            res.render('tweets/show', {
                title: 'Tweet Detail',
                tweet,
                Users,
                user: req.user,
                name: req.query.name,
            });
        });
}

function createTweet(req, res) {
    req.body.nowShowing = !!req.body.nowShowing;

    const tweet = new Tweets(req.body);
    tweet.save(function (error) {
        res.redirect('tweets');
        if (error) {
            console.log(error);
        }
    });
}

function update(req, res) {
    res.render('tweets/edit', {
        title: 'Edit Tweet',
        tweet: Tweets.findById(req.params.id),
        Users,
        user: req.user,
        name: req.query.name,
    });
}

function editTweet(req, res) {
    req.body.done = !!req.body.done;
    console.log(req.params.id);
    Tweets.findOneAndUpdate({ _id: req.params.id }, { $set: req.body });
    res.redirect('/');
}

function deleteTweet(req, res, next) {
    Tweets.deleteOne({ _id: req.params.id });
    res.redirect('/');
}


module.exports = {
    addTweet,
    showTweet,
    index: show,
    createTweet,
    update,
    editTweet,
    deleteTweet,
}