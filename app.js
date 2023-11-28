const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");

// DB config
const db = process.env.MONGODB_URI;

require("./config/passport")(passport);

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((err) => {
    console.log(err);
  });

// EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./templates"));

// Middlewares
app.use(express.urlencoded({ extended: false })); // body-parser
app.use(
  session({
    secret: "qazwsxedcrfvtgbyhnujmikolp",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// Global Variables

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// Routes
const indexRoutes = require("./routes/index");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");

app.use("", indexRoutes);
app.use("", userRoutes);
app.use("", productRoutes);

const port = process.env.PORT || 4000;
app.listen(port, console.log(`App is listenting http://localhost:4000`));
