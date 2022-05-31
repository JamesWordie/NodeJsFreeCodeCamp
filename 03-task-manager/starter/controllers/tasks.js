const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

const getAllTasks = asyncWrapper(async (req, res) => {
  //   try {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
  //   } catch (error) {
  //     res.status(500).json({ message: error });
  //   }
});

const getTask = asyncWrapper(async (req, res, next) => {
  //   try {
  const { id: taskId } = req.params;
  const task = await Task.findOne({ _id: taskId });

  if (!task) {
    return next(createCustomError(`No task with id: ${taskId}`, 404));
  }

  res.status(200).json({ task });
  //   } catch (error) {
  //     res.status(500).json({ message: error });
  //   }
});

const createTask = asyncWrapper(async (req, res) => {
  //   try {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
  //   } catch (error) {
  //     res.status(500).json({ message: error });
  //   }
});

const updateTask = asyncWrapper(async (req, res) => {
  //   try {
  const { id: taskId } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return next(createCustomError(`No task with id: ${taskId}`, 404));
  }

  res.status(200).json({ task });
  //   } catch (error) {
  //     res.status(500).json({ message: error });
  //   }
});

const deleteTask = asyncWrapper(async (req, res) => {
  //   try {
  const { id: taskId } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskId });

  if (!task) {
    return next(createCustomError(`No task with id: ${taskId}`, 404));
  }

  res.status(200);
  //   } catch (error) {
  //     res.status(500).json({ message: error });
  //   }
});

module.exports = { getAllTasks, getTask, createTask, updateTask, deleteTask };

// GET All Tasks
// app.get("/api/v1/tasks", (req, res) => {});
// Post Create New Task
// app.post("/api/v1/tasks", (req, res) => {});
// GET Single Task
// app.get("/api/v1/tasks/:id", (req, res) => {});
// PATCH Update A Single Task
// app.patch("/api/v1/tasks/:id", (req, res) => {});
// DELETE Delete a Single Task
// app.delete("/api/v1/tasks/:id", (req, res) => {});
