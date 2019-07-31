const express = require("express");
const router = express.Router();
const Barter = require("../models/barter");
const uploadCloud = require("../config/cloudinary.js");

/* GET home page */
// router.get('/', (req, res, next) => {
//   res.render('index');
// });

router.route("/trocs").get((req, res) => {
  res.json({ label: "hello" });
});

// Add new barter
router.post("/trocs", uploadCloud.single("image"), (req, res) => {
  const { title, description, condition, category } = req.body;
  var new_barter = new Barter({
    title,
    category,
    description,
    condition,
    imageUrl: req.file.url
  });

  new_barter.save(function(error) {
    if (error) {
      console.log(error);
    }
    res.send({
      success: true,
      message: "Post saved successfully!"
    });
  });
});

module.exports = router;
