var express = require('express');
var router = express.Router();
const Users = require('../models/user');

/* GET home page. */
router.get('/search', function (req, res, next) {
    res.render('search/index',
        {
            Users,
            user: req.user,
            name: req.query.name,
            title: 'Search Tweet Feels',
        });
});

module.exports = router;