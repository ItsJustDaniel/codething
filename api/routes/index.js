var express = require("express");
var router = express.Router();

//Node serve the files for our built React app

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
