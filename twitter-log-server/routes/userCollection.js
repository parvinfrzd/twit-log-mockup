var express = require('express');
var router = express.Router();
var Users = require('../models/user');

router.get('/myCollection', function (req, res, next) {
    res.render('myCollection/index', {
        title: 'My Collections',
        Users,
        user: req.user,
        name: req.query.name,
    })
});

module.exports = router;