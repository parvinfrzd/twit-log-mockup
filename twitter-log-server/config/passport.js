const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const Users = require('../models/user');


passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK,
        },
        // a user has logged in with OAuth...
        function (accessToken, refreshToken, profile, cb) {
            // 1- find the user inside our DB, who has just signed into the app
            // profile.id is coming from Google
            Users.findOne({ googleId: profile.id })
                .then((user) => {
                    if (user) {
                        return user;
                    }

                    return Users.create({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        googleId: profile.id,
                    });
                })
                .then((user) => cb(null, user))
                .catch((err) => cb(err));
        }
    )
);

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    Users.findById(id)
        .then((user) => done(null, user))
        .catch((err) => done(err, null));
});