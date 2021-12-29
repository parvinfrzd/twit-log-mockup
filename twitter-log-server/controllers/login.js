const Users = require('../models/user');

function index(req, res, next) {
    console.log(req.query);
    res.render('login/index', {
        Users,
        user: req.user,
        name: req.query.name,
    });
}

module.exports = {
    index,
}