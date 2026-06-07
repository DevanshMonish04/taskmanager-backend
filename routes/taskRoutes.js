import express from "express";

import {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
  toggleTask,
} from "../controllers/taskController.js";

// Create Express router instance
const router = express.Router();

// GET /api/tasks
// Retrieve all tasks from the database
router.get("/", getTasks);

// POST /api/tasks
// Create a new task
router.post("/", createTask);

// PUT /api/tasks/:id
// Update an existing task by ID
router.put("/:id", updateTask);

// PATCH /api/tasks/:id/toggle
// Toggle task completion status (completed/incomplete)
router.patch("/:id/toggle", toggleTask);

// DELETE /api/tasks/:id
// Remove a task by ID
router.delete("/:id", deleteTask);

// Export router for use in server.js
export default router;