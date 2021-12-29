var express = require('express');
var router = express.Router();
const passport = require('passport');
const Users = require('../models/user');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.redirect('/login');
});

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback route
router.get(
  '/oauth2callback',
  passport.authenticate('google', {
    successRedirect: '/login',
    failureRedirect: '/login',
  })
);

// OAuth logout route
router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/login');
});

module.exports = router;
