var mongoose = require("mongoose");
var { DateTime } = require("luxon");

var Schema = mongoose.Schema;

var MessageSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  time: { type: Date, default: Date.now },
  title: { type: String, required: true },
  message: { type: String, required: true },
});

MessageSchema.virtual("date").get(function () {
  return DateTime.fromJSDate(this.timestamp).toFormat("dd-MM-yyyy, HH:mm");
});

//Export model
module.exports = mongoose.model("Message", MessageSchema);
