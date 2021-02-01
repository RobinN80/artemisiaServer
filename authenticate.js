const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');

exports.local = passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.verifyAdmin = (req, res, next) => {
    if (req.user.admin){
        next();
    } else {
        const err = new Error('You are not authorized');
        err.status = 400;
        return next (err);
    }
};