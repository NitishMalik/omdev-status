const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const TaskSchema = new Schema({
  uid: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  pid: {
    type: Schema.Types.ObjectId,
    ref: "profiles"
  },
  taskName: {
    type: String,
    required: true
  },
  project: {
    type: String,
    required: true
  },
  app: {
    type: String,
    required: true
  },
  details: {
    type: String
  },
  from: {
    type: Date,
    required: true
  },
  to: {
    type: Date
  },
  dependencies: {
    type: String
  },
  lud: {
    type: Date,
    default: Date.now
  }
});

module.exports = Task = mongoose.model("tasks", TaskSchema);
