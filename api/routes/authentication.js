const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("../config/authentication")

router.post(
  "/signin",
  passport.authenticate("local",
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    //res.redirect('/users/' + req.user.username);
    return res.json({message:'youpi'}); // FIXME
  }));

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

module.exports = router;
