const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

const router = express.Router();

// Get all users (admin only)
router.get("/", auth, role(["Admin"]), async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

// Delete user by ID (admin only)
router.delete("/:id", auth, role(["Admin"]), async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
});

// Update user info (admin only)
router.put("/:id", auth, role(["Admin"]), async (req, res) => {
  const updates = req.body;
  const user = await User.findByIdAndUpdate(req.params.id, updates, {
    new: true,
  }).select("-password");
  res.json(user);
});

module.exports = router;
