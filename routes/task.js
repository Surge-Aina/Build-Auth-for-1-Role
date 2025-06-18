const express = require("express");
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const verifyToken = require("../middleware/verifyToken");
const verifyRole = require("../middleware/verifyRole");
const task = require("../models/task");
const User = require("../models/user");
const router = express.Router();

// Create a new task (Manager only)
router.post("/", auth, role(["Manager"]), async (req, res) => {
  const { title, description, assignedTo } = req.body;
  const task = new Task({
    title,
    description,
    assignedTo,
    createdBy: req.user._id,
  });

  await task.save();
  res.status(201).json(task);
});

router.post(
  "/assign",
  verifyToken,
  verifyRole("manager"), // Only manager can assign tasks
  (req, res) => {
    res.send("Task assigned!");
  }
);

// Only Manager can assign a task
router.post("/", verifyToken, verifyRole("manager"), async (req, res) => {
  try {
    const { title, description, assignedTo } = req.body;

    const assignedUser = await User.findById(assignedTo);
    if (!assignedUser || assignedUser.role !== "worker") {
      return res
        .status(400)
        .json({ message: "You can only assign tasks to workers" });
    }

    const newTask = new Task({
      title,
      description,
      assignedTo,
      assignedBy: req.user.id,
    });

    await newTask.save();
    res.status(201).json({ message: "Task assigned", task: newTask });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Only the assigned worker can mark task as complete
router.patch(
  "/:id/complete",
  verifyToken,
  verifyRole("worker"),
  async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);

      if (!task) return res.status(404).json({ message: "Task not found" });

      if (task.assignedTo.toString() !== req.user.id) {
        return res
          .status(403)
          .json({ message: "You are not assigned to this task" });
      }

      task.status = "complete";
      await task.save();
      res.json({ message: "Task marked as complete", task });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Get all tasks (authenticated)
router.get("/", auth, async (req, res) => {
  const tasks = await Task.find().populate("assignedTo").populate("createdBy");
  res.json(tasks);
});

// Update task status (Worker only)
router.patch("/:id", auth, role(["Worker"]), async (req, res) => {
  const { status } = req.body;
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );
  res.json(task);
});
router.get("/", (req, res) => {
  res.json({ message: "Tasks route is working" });
});
// Delete task (Manager only)
router.delete("/:id", auth, role(["Manager"]), async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
});

module.exports = router;
