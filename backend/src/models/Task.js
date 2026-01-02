const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
    maxlength: [200, "Title must not exceed 200 characters"],
    minlength: [1, "Title cannot be empty"],
  },
  description: {
    type: String,
    trim: true,
    maxlength: [1000, "Description must not exceed 1000 characters"],
  },
  targetDate: {
    type: Date,
  },
  priority: {
    type: Number,
    min: [1, "Priority must be at least 1"],
    max: [5, "Priority must not exceed 5"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);
