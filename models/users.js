var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true },
  member: { type: Boolean, default: false },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

//Export model
module.exports = mongoose.model("User", UserSchema);
