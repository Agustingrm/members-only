var express = require("express");
var router = express.Router();

// Require controller modules.
var user_controller = require("../controllers/userController");
var auth_controller = require("../controllers/authController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Members Only", user: req.user });
});

//SIGN UP
router.get("/sign-up", user_controller.user_create_get);
router.post("/sign-up", user_controller.user_create_post);

//LOG IN
router.get("/log-in", auth_controller.user_login_get);
router.post("/log-in", auth_controller.user_login_post);
router.get("/log-out", auth_controller.user_logout_get);

module.exports = router;
