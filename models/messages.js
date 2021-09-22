var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var MessageSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  time: { type: Date, default: Date.now },
  title: { type: String, required: true },
  message: { type: String, required: true },
});

//Export model
module.exports = mongoose.model("Message", MessageSchema);
