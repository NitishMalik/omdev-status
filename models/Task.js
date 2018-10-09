const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const TaskSchema = new Schema({
  uid: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  n: {
    type: String,
    required: true
  },
  p: {
    type: String,
    required: true
  },
  app: {
    type: String,
    required: true
  },
  d: {
    type: String
  },
  f: {
    type: Date,
    required: true
  },
  t: {
    type: Date
  },
  dp: {
    type: String
  },
  lud: {
    type: Date,
    default: Date.now
  }
});

module.exports = Task = mongoose.model("tasks", TaskSchema);
