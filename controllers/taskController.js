import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const filePath = "./data/tasks.json";

const readTasks = () => {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
};

const writeTasks = (tasks) => {
  fs.writeFileSync(
    filePath,
    JSON.stringify(tasks, null, 2)
  );
};

export const getTasks = (req, res) => {
  const tasks = readTasks();
  res.json(tasks);
};

export const createTask = (req, res) => {
  const tasks = readTasks();

  const newTask = {
  id: uuidv4(),
  title: req.body.title,
  description: req.body.description || "",
  startDate:
    req.body.startDate ||
    new Date().toISOString().split("T")[0],
  dueDate: req.body.dueDate || "",
  completed: false,
};

  tasks.unshift(newTask);

  writeTasks(tasks);

  res.status(201).json(newTask);
};

export const deleteTask = (req, res) => {
  const tasks = readTasks();

  const updatedTasks = tasks.filter(
    (task) => task.id !== req.params.id
  );

  writeTasks(updatedTasks);

  res.json({
    message: "Task deleted",
  });
};

export const updateTask = (req, res) => {
  const tasks = readTasks();

  const updatedTasks = tasks.map((task) =>
    task.id === req.params.id
      ? { ...task, ...req.body }
      : task
  );

  writeTasks(updatedTasks);

  res.json({
    message: "Task updated",
  });
};

export const toggleTask = (req, res) => {
  const tasks = readTasks();

  const updatedTasks = tasks.map((task) =>
    task.id === req.params.id
      ? {
          ...task,
          completed: !task.completed,
        }
      : task
  );

  writeTasks(updatedTasks);

  res.json({
    message: "Task toggled",
  });
};