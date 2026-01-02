// Validation middleware for task data
const validateTask = (req, res, next) => {
  const { title, description, targetDate, priority, completed } = req.body;

  // Validate title
  if (!title || typeof title !== "string") {
    return res.status(400).json({ 
      message: "Title is required and must be a string" 
    });
  }

  if (title.trim().length === 0) {
    return res.status(400).json({ 
      message: "Title cannot be empty" 
    });
  }

  if (title.length > 200) {
    return res.status(400).json({ 
      message: "Title must not exceed 200 characters" 
    });
  }

  // Validate description
  if (description !== undefined && description !== null) {
    if (typeof description !== "string") {
      return res.status(400).json({ 
        message: "Description must be a string" 
      });
    }
    if (description.length > 1000) {
      return res.status(400).json({ 
        message: "Description must not exceed 1000 characters" 
      });
    }
  }

  // Validate priority
  if (priority !== undefined && priority !== null) {
    const priorityNum = Number(priority);
    if (!Number.isInteger(priorityNum) || priorityNum < 1 || priorityNum > 5) {
      return res.status(400).json({ 
        message: "Priority must be an integer between 1 and 5" 
      });
    }
  }

  // Validate targetDate
  if (targetDate !== undefined && targetDate !== null) {
    const date = new Date(targetDate);
    if (isNaN(date.getTime())) {
      return res.status(400).json({ 
        message: "Invalid targetDate format" 
      });
    }
  }

  // Validate completed
  if (completed !== undefined && completed !== null) {
    if (typeof completed !== "boolean") {
      return res.status(400).json({ 
        message: "Completed must be a boolean" 
      });
    }
  }

  next();
};

// Validation for partial updates
const validatePartialUpdate = (req, res, next) => {
  const { title, description, targetDate, priority, completed } = req.body;

  // Validate title if provided
  if (title !== undefined && title !== null) {
    if (typeof title !== "string") {
      return res.status(400).json({ 
        message: "Title must be a string" 
      });
    }
    if (title.trim().length === 0) {
      return res.status(400).json({ 
        message: "Title cannot be empty" 
      });
    }
    if (title.length > 200) {
      return res.status(400).json({ 
        message: "Title must not exceed 200 characters" 
      });
    }
  }

  // Validate description if provided
  if (description !== undefined && description !== null) {
    if (typeof description !== "string") {
      return res.status(400).json({ 
        message: "Description must be a string" 
      });
    }
    if (description.length > 1000) {
      return res.status(400).json({ 
        message: "Description must not exceed 1000 characters" 
      });
    }
  }

  // Validate priority if provided
  if (priority !== undefined && priority !== null) {
    const priorityNum = Number(priority);
    if (!Number.isInteger(priorityNum) || priorityNum < 1 || priorityNum > 5) {
      return res.status(400).json({ 
        message: "Priority must be an integer between 1 and 5" 
      });
    }
  }

  // Validate targetDate if provided
  if (targetDate !== undefined && targetDate !== null) {
    const date = new Date(targetDate);
    if (isNaN(date.getTime())) {
      return res.status(400).json({ 
        message: "Invalid targetDate format" 
      });
    }
  }

  // Validate completed if provided
  if (completed !== undefined && completed !== null) {
    if (typeof completed !== "boolean") {
      return res.status(400).json({ 
        message: "Completed must be a boolean" 
      });
    }
  }

  next();
};

module.exports = {
  validateTask,
  validatePartialUpdate,
};
