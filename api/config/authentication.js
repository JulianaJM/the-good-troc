const passport              = require("passport");
const LocalStrategy         = require("passport-local").Strategy;
const User                  = require("../models/user");

passport.serializeUser(function(user, next) {
  next(null, user._id);
});

passport.deserializeUser(function(userId, next) {
  User.findById(userId, (err, user) => next(err, user));
});

const localStrategy = new LocalStrategy((username, password, next) => {
  User.findOne({ username })
    .then(user => {
      if (!user || !user.validPassword(password)) {
        next(null, false, { message: "Invalid username/password" });
      } else {
        next(null, user);
      }
    })
    .catch(e => next(e));
});

passport.use("local-signup", localStrategy);

module.exports = passport;
