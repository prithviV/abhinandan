
var users = require('../models/users')
var localStrategy = require('passport-local');

module.exports = function(passport){
    

    passport.use('login', new localStrategy({
            usernameField: 'userName',
            passwordField: 'userPassword',
            passReqToCallback : true
        },
        function(req, username, password, done) {
            console.log(password);
            console.log('passport.js validations')
            // check in mongo if a user with username exists or not
            users.findOne({ 'username' :  username }, 
                function(err, user) {
                    // In case of any error, return using the done method
                    if (err)
                    return done(err);
                    // Username does not exist, log error & redirect back
                    if (!user){
                    console.log('User Not Found with username '+username);
                    return done(null, false, 
                            req.flash('message', 'User Not found.'));                 
                    }
                    //User exists but wrong password, log the error 
                    if (user.password != password) {
                    return done(null, false, 
                        req.flash('message', 'Invalid Password'));
                    }
                    //User and password both match, return user from 
                    //done method which will be treated like success
                    return done(null, user);
                }
            );
        })
    );

    //PASSPORT FOR LOGIN
    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        users.findById(id, function(err, user) {
            done(err, user);
        });
    });
};