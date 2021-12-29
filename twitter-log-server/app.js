const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();

// create the Express app
const app = express();

// connect to the MongoDB with mongoose
require('./config/database');
// initialize PassportJS
require('./config/passport');

// require our routes
const indexRoutes = require('./routes/index');
const loginRoutes = require('./routes/login');
const tweetRoutes = require('./routes/tweets');
const searchRoutes = require('./routes/search');
const infoRoutes = require('./routes/info');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: true,
  })
);

// Passport mounted to express
app.use(passport.initialize());
app.use(passport.session());

// mount all routes with appropriate base paths
app.use('/', indexRoutes);
app.use('/', loginRoutes);
app.use('/tweets', tweetRoutes);
app.use('/', infoRoutes);
app.use('/', searchRoutes);

// invalid request, send 404 page
app.use(function (req, res) {
  res.status(404).send('Cant find that!');
});

module.exports = app;