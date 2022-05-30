const express = require("express");
const router = express.Router();
const {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks");

// This will match the app.use('/api/v1/tasks)

// GET All Tasks
// app.get("/api/v1/tasks", (req, res) => {});
// Post Create New Task
// app.post("/api/v1/tasks", (req, res) => {});
router.route("/").get(getAllTasks).post(createTask);

// GET Single Task
// app.get("/api/v1/tasks/:id", (req, res) => {});
// PATCH Update A Single Task
// app.patch("/api/v1/tasks/:id", (req, res) => {});
// GET Single Task// DELETE Delete a Single Task
// app.delete("/api/v1/tasks/:id", (req, res) => {});
router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router;
