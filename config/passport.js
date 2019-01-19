const LocalStrategy = require('passport-local').Strategy;
const {User, Guest} = require('../models/user');
const config = require('../config/database');
const bcrypt = require('bcrypt');

module.exports = function (passport) {

    // Local Strategy
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, function (email, password, done){
        // Match User Name
        let query ={email:email};
        console.log(query);
        User.findOne(query, function (err, user) {
            if (err) throw err;
            console.log(user);
            if (!user){
                return done(null, false, {message: 'No user found'});
            }

            // Match User password
            bcrypt.compare(password, user.password, function (err, isMatch) {
                if (err) throw err;
                if (isMatch){
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'Wrong password'});
                }
            });
        });
    }));

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
}