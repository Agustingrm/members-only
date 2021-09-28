var express = require("express");
var router = express.Router();

// Require controller modules.
var user_controller = require("../controllers/userController");
var auth_controller = require("../controllers/authController");
var message_controller = require("../controllers/messageController");

/* GET home page. */
router.get("/", message_controller.message_list);

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

//BECOME AN ADMIN
router.get("/become-admin", user_controller.become_admin_get);
router.post("/become-admin", user_controller.become_admin_post);

//WRITE MESSAGE
router.get("/write-message", message_controller.message_create_get);
router.post("/write-message", message_controller.message_create_post);

//DELETE MESSAGE
router.post("/", message_controller.message_delete_post);

module.exports = router;
