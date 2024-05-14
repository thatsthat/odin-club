var express = require("express");
var router = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const { body, validationResult } = require("express-validator");

const messages = [
  {
    text: "Hi there 11!",
    user: "Amandillo",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
  {
    text: "orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    user: "Pep",
    added: new Date(),
  },
];

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Mini Messageboard", messages: messages });
});

/* GET home page. */
router.get("/new", function (req, res, next) {
  res.render("form", { title: "Mini Messageboard" });
  router.post();
});

/* POST action for new message form. */
router.post("/new", function (req, res, next) {
  messages.push({
    user: req.body.user,
    text: req.body.message,
    added: new Date(),
  });
  res.redirect("/");
});

// New user sign-up
router.get("/sign-up", (req, res) => res.render("sign-up-form"));

router.post("/sign-up", async (req, res, next) => {
  try {
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      const user = new User({
        username: req.body.username,
        password: hashedPassword,
        isAdmin: true,
      });
      const result = await user.save();
    });
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
});

// User login

router.get("/log-in", (req, res) => res.render("login-form"));

router.post("/log-in", [
  // Validate and sanitize fields.
  body("username", "Please provide a username and password")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("password", "Please provide a username and password")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.
      console.log(errors.array());
      res.render("login-form", {
        message: errors.array()[0].msg,
        username: req.body.username,
        password: req.body.password,
      });
    } else {
      // Data from form is valid. Proceed with authentication
      next();
    }
  }),
  passport.authenticate("local", {
    successRedirect: "/success",
    failureRedirect: "/failure",
    failureMessage: true,
  }),
]);

router.get("/success", (req, res) => {
  res.send("Login OK!");
});

router.get("/failure", (req, res) => {
  res.render("login-form", {
    message: "wrong username / password",
  });
});

router.get("/login-error", (req, res) => {
  res.render("login-form", { message: "Invalid Username/Password" });
});

router.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
