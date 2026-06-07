import fs from "fs";
import { v4 as uuidv4 } from "uuid";

// Path to the JSON file used as a simple database
const filePath = "./data/tasks.json";

// Read all tasks from JSON file
const readTasks = () => {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
};

// Write updated tasks back to JSON file
const writeTasks = (tasks) => {
  fs.writeFileSync(
    filePath,
    JSON.stringify(tasks, null, 2)
  );
};

// GET /api/tasks
// Fetch and return all tasks
export const getTasks = (req, res) => {
  const tasks = readTasks();
  res.json(tasks);
};

// POST /api/tasks
// Create a new task
export const createTask = (req, res) => {
  const tasks = readTasks();

  // Create task object with unique ID
  const newTask = {
    id: uuidv4(), // Generate unique task ID
    title: req.body.title,
    description: req.body.description || "",

    // Use provided start date or today's date
    startDate:
      req.body.startDate ||
      new Date().toISOString().split("T")[0],

    // Optional due date
    dueDate: req.body.dueDate || "",

    // New tasks are incomplete by default
    completed: false,
  };

  // Add new task at the beginning of the array
  tasks.unshift(newTask);

  // Save updated task list
  writeTasks(tasks);

  // Return newly created task
  res.status(201).json(newTask);
};

// DELETE /api/tasks/:id
// Delete a task by ID
export const deleteTask = (req, res) => {
  const tasks = readTasks();

  // Remove matching task
  const updatedTasks = tasks.filter(
    (task) => task.id !== req.params.id
  );

  // Save updated list
  writeTasks(updatedTasks);

  res.json({
    message: "Task deleted",
  });
};

// PUT /api/tasks/:id
// Update task details by ID
export const updateTask = (req, res) => {
  const tasks = readTasks();

  // Update matching task with new values
  const updatedTasks = tasks.map((task) =>
    task.id === req.params.id
      ? { ...task, ...req.body }
      : task
  );

  // Save updated list
  writeTasks(updatedTasks);

  res.json({
    message: "Task updated",
  });
};

// PATCH /api/tasks/:id/toggle
// Toggle task completion status
export const toggleTask = (req, res) => {
  const tasks = readTasks();

  // Flip completed value of matching task
  const updatedTasks = tasks.map((task) =>
    task.id === req.params.id
      ? {
          ...task,
          completed: !task.completed,
        }
      : task
  );

  // Save updated list
  writeTasks(updatedTasks);

  res.json({
    message: "Task toggled",
  });
};