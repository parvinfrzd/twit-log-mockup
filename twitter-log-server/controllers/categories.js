const Tweet = require('../models/tweet');
const Category = require('../models/category');
const Users = require('../models/user');


function addToCategory(req, res) {
    Tweet.findById(req.params.id, function (err, tweet) {
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

module.exports = {
    newCategory,
    createCategory,
    addToCategory,
    index
};