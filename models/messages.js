var mongoose = require("mongoose");
var { DateTime } = require("luxon");

var Schema = mongoose.Schema;

var MessageSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  time: { type: Date, default: Date.now },
  title: { type: String, required: true },
  message: { type: String, required: true },
});

//Takes the date in the db and gives it an appropriate format
MessageSchema.virtual('formatedDate').get(function () {
  return DateTime.fromJSDate(this.time).toFormat("hh:mm dd/MM/yyyy");
});

//Export model
module.exports = mongoose.model("Message", MessageSchema);
