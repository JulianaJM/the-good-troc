const express = require('express');
const router  = express.Router();

/* GET home page */
// router.get('/', (req, res, next) => {
//   res.render('index');
// });

router.route('/trocs').get((req, res) => {
  res.json({label:"hello"});
});

module.exports = router;
