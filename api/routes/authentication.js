const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("../config/authentication");
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');  
const authenticate = expressJwt({secret : 'server secret'});

router.post(
  "/signin",
  passport.authenticate( 'local', {
    session: false
    // As token based authentication doesn’t need session cookies, we need to make sure to disable passports store by setting the session option to false. 
    // This way passport won’t create session cookies
  }), serialize, generateToken, respond);

// Register Handler
router.post("/signup", (req, res, next) => {
  const { username, password, email } = req.body;
  User.create({ username, password, email })
    .then(user => {
      req.logIn(user, err => {
        if (err) next(err);
        else res.json(user);
      });
    })
    .catch(err => {
      if (err.name === "ValidationError") {
        res
          .status(400)
          .json({ message: "Sorry, that username is already taken." });  // TODO erreur 500
      } else next(err);
    });
});

router.get('/lists', authenticate, function(req, res) {  
  res.status(200).json(req.user);
});

function serialize(req, res, next) {  
    req.user = {
      id: req.user.id,
      username: req.user.username
    };
    next();
}

function generateToken(req, res, next) {  
  req.token = jwt.sign({
    id: req.user.id,
  }, 'server secret', {
    expiresIn: "7d"
  });
  next();
}

function respond(req, res) {  
  res.status(200).json({
    ...req.user,
    token: req.token
  });
}

module.exports = router;
