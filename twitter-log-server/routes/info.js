var express = require('express');
var router = express.Router();
const Users = require('../models/user');

/* GET home page. */
router.get('/info', function (req, res, next) {
    res.render('info/index',
        {
            Users,
            user: req.user,
            name: req.query.name,
            title: 'Info',
        });
});

module.exports = router;