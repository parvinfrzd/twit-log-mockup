var Tweets = require('../models/tweet');
var Users = require('../models/user');
var Category = require('../models/category');

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
        .populate('category').exec(function (err, tweet) {
            Category.find({ _id: { $nin: tweet.category } })
                .exec(function (err, categ) {
                    res.render('tweets/show', {
                        title: 'Tweet Detail',
                        tweet,
                        categ,
                        Users,
                        user: req.user,
                        name: req.query.name,
                    });
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

async function update(req, res) {
    res.render('tweets/edit', {
        title: 'Edit Tweet',
        tweet: await Tweets.findById(req.params.id),
        Users,
        user: req.user,
        name: req.query.name,
    });
}

async function editTweet(req, res) {
    req.body.done = !!req.body.done;
    console.log('the id : ', req.params.id);
    await Tweets.findOneAndUpdate({ _id: req.params.id }, req.body);
    res.redirect('/tweets');
}

async function deleteTweet(req, res, next) {
    await Tweets.deleteOne({ _id: req.params.id });
    res.redirect('/tweets');
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