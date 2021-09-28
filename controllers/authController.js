var User = require("../models/users");
const passport = require("passport");

exports.user_login_get = (req, res, next) => {
  res.render("log-in", { title: "Sign Up", user:'' });
};

exports.user_login_post = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/log-in",
});

exports.user_logout_get = (req, res) => {
  req.logout();
  res.redirect("/");
};
