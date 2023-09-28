const express = require("express");
const router = express.Router();
const User = require("../models/usersSchema");
const bcrypt = require("bcrypt");
const passport = require("passport");
const { forwardAuthenticated } = require("../config/auth");

router.get("/signup", forwardAuthenticated, (req, res) => {
  res.render("signup");
});

router.post("/signup", async (req, res) => {
  const { name, email, password, password2 } = req.body;

  const errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please fill all fields" });
  }
  if (password2 !== password) {
    errors.push({ msg: "Password do not match" });
  }
  if (password.length < 6) {
    errors.push({ msg: "Password mush be grater than 6 characters" });
  }
  if (errors.length > 0) {
    res.render("signup", {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    User.findOne({ email: email }).then((user) => {
      if (user) {
        errors.push({ msg: "Email already registered" });
        res.render("signup", {
          errors,
          name,
          email,
          password,
          password2,
        });
      } else {
        const newUser = new User({ name, email, password });

        // hash password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;

            // set user password to hash password
            newUser.password = hash;

            newUser
              .save()
              .then((user) => {
                req.flash("success_msg", "You are successfully registered.");
                res.redirect("login");
              })
              .catch((err) => console.log(err));
          });
        });
      }
    });
  }
});

router.get("/login", forwardAuthenticated, (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logOut((err) => {
    if (err) {
      console.error(err);
      return res.redirect("/");
    }
    req.flash("success_msg", "You are successfully logged out.");
    res.redirect("/login");
  });
});

module.exports = router;
