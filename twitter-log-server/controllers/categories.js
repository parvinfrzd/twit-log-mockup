const Tweet = require('../models/tweet');
const Category = require('../models/category');
const Users = require('../models/user');


function addToCategory(req, res) {
    Tweet.findById(req.params.id, function (err, tweet) {
        console.log("category added: ", req.body.categoryId)
        tweet.category.push(req.body.categoryId);
        tweet.save(function (err) {
            console.log(err);
            res.redirect(`/tweets/${tweet._id}`);
        });
    });
}

function createCategory(req, res) {
    console.log('category created');
    Category.create(req.body, function (err, category) {
        res.redirect('/category');
    });
}

function newCategory(req, res) {
    Category.find({}, function (err, categs) {
        res.render('category/index', {
            title: 'Add Category',
            Users,
            user: req.user,
            name: req.query.name,
            categs
        });
    })
}

function index(req, res) {
    Category.find({}, function (err, categs) {
        res.render('category/index', {
            title: 'All Categories',
            categs,
            Users,
            user: req.user,
            name: req.query.name,
        })
    })
}

function showTweets(req, res) {
    Category.findById(req.params.id)
        .populate('tweet').exec(function (err, category) {
            Tweet.find({ _id: { $nin: category.tweet } })
                .exec(function (err, tweet) {
                    res.render('category/show', {
                        title: 'Tweet Detail',
                        tweet,
                        category,
                        Users,
                        user: req.user,
                        name: req.query.name,
                    });
                });

        });
}

module.exports = {
    newCategory,
    createCategory,
    addToCategory,
    index,
    showTweets,
};