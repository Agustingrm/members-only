var User = require("../models/users");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
require("dotenv").config();

// Handle User create on GET.
exports.user_create_get = (req, res, next) => {
  res.render("sign-up", { title: "Sign Up", errors: "" });
};

// Handle User create on POST.
exports.user_create_post = [
  // Validate and sanitise fields.
  body("firstName", "First Name must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("lastName", "Last Name must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("username", "Username must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("email", "Email must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("password", "Password must be ar least 8 characters.").trim().isLength({ min: 8 }).escape(),
  body("passwordConfirmation", "Password Confirmation must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .custom(async (value, { req }) => {
      //Verifies if password and password confirmation match
      if (value !== req.body.password) throw new Error("Passwords do not macht");
      return true;
    }),
  // Process request after validation and sanitization.

  (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
      if (err) {
        console.log(err);
        return;
      } else {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Item object with escaped and trimmed data.
        var user = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          member: false,
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword,
        });

        if (!errors.isEmpty()) {
          console.log(errors.array());
          // There are errors. Render form again with sanitized values/error messages.
          console.log("asd");
          res.render("sign-up", {
            title: "Create User",
            user: user,
            errors: errors.array(),
          });
        } else {
          console.log("VALID");
          // Data from form is valid. Save user.
          user.save(function (err) {
            if (err) {
              return next(err);
            }
            //successful - redirect to new user record.
            res.redirect("/");
          });
        }
      }
    });
  },
];

//Handle membership on GET
exports.join_member_get = (req, res, next) => {
  if (res.locals.currentUser ? false : true) {
    res.redirect("/log-in");
  } else {
    return res.render("join-member", { title: "Become a member", user: res.locals.currentUser });
  }
};

//Handle membership on POST
exports.join_member_post = [
  // Validate and sanitise fields.
  body("secret", "Secret word must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .custom(async (value) => {
      //Verifies if secret word match with the stored one
      if (value !== process.env.secretWord) throw new Error("Secret Word does not macht");
      console.log
      return true;
    }),
  // Process request after validation and sanitization.
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors.array());
      // There are errors. Render form again with sanitized values/error messages.
      res.render("join-member", {
        title: "Become a Member",
        errors: errors.array(),
      });
    } else {
      const user = new User(res.locals.currentUser);
      user.member = true;

      await User.findByIdAndUpdate(res.locals.currentUser._id, user, {}, (err) => {
        if (err) {
          return next(err);
        }
        return res.redirect("join-member");
      });
    }
  },
];
