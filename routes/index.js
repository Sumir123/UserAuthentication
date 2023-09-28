const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");

router.get("/", ensureAuthenticated, (req, res, next) => {
  res.render("layout/base", {
    pageTitle: "Home Page",
    pageName: "index",
    user: req.user.name,
  });
});

module.exports = router;
