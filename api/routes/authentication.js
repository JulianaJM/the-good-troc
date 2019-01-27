const express = require("express");
const router = express.Router();
const User = require("../models/user");

// Register Handler
router.post("/signup", (req, res, next) => {
  const { username, password, email } = req.body;
  User.create({ username, password, email })
    .then(user => {
      req.login(user, err => {
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
