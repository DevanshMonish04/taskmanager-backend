import express from "express";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes.js";

// Create Express application instance
const app = express();

// Enable Cross-Origin Resource Sharing (CORS)
// Allows frontend applications from different origins
// to communicate with this backend API
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(express.json());

// Register task-related routes
// All task endpoints will be prefixed with "/api/tasks"
app.use("/api/tasks", taskRoutes);

// Define server port
const PORT = process.env.PORT || 5000;

// Default route to verify API is running
app.get("/", (req, res) => {
  res.send("Task Manager API is running...");
});

// Start Express server and listen on all network interfaces
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});