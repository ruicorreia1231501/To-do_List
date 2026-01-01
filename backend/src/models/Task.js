const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  targetDate: {
    type: Date,
    required: false,
  },
  priority: {
    type: Number,
    required: false,
    min: 1,
    max: 5,
  },
  completed: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);
