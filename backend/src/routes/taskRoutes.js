const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const { validateTask, validatePartialUpdate } = require("../middleware/validation");

// GET all tasks
router.get("/", taskController.getAllTasks);

// GET a task by ID
router.get("/:id", taskController.getTaskById);

// POST create a new task
router.post("/", validateTask, taskController.createTask);

// PUT edit a task (update)
router.put("/:id", validateTask, taskController.updateTask);

// PATCH complete a task
router.patch("/:id", validatePartialUpdate, taskController.partialUpdateTask);

// DELETE a task
router.delete("/:id", taskController.deleteTask);

module.exports = router;
