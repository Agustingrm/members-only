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

//LOG IN AND LOG OUT
router.get("/log-in", auth_controller.user_login_get);
router.post("/log-in", auth_controller.user_login_post);
router.get("/log-out", auth_controller.user_logout_get);

//BECOME A MEMBER
router.get("/join-member", user_controller.join_member_get);
router.post("/join-member", user_controller.join_member_post);

module.exports = router;
