var User = require("../models/users");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

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
