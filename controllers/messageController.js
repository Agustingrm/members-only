var Message = require("../models/messages");
const { body, validationResult } = require("express-validator");

// Handle Message create on GET.
exports.message_create_get = (req, res, next) => {
  res.render("write-message", { title: "New Message", errors: "" });
};

// Handle Message create on POST.
exports.message_create_post = [
  // Validate and sanitise fields.
  body("title", "Title Name must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("messageContent", "Last Name must not be empty.").trim().isLength({ min: 1 }).escape(),
  // Process request after validation and sanitization.

  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Item object with escaped and trimmed data.
    var message = new Message({
      author: req.user._id,
      time: Date.now(),
      title: req.body.title,
      message: req.body.messageContent,
    });

    if (!errors.isEmpty()) {
      console.log(errors.array());
      // There are errors. Render form again with sanitized values/error messages.
      console.log("asd");
      res.render("write-message", {
        title: "Write Message",
        message: message,
        errors: errors.array(),
      });
    } else {
      console.log("VALIDasd");
      // Data from form is valid. Save message.
      message.save(function (err) {
        if (err) {
          return next(err);
        }
        //successful - redirect to new message record.
        res.redirect("/");
      });
    }
  },
];
