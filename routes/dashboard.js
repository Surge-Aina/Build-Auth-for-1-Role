const express = require("express");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

const router = express.Router();

// Manager-only dashboard
router.get("/manager", auth, role(["Manager"]), (req, res) => {
  res.status(200).json({
    message: `Welcome Manager: ${req.user.username}`,
    email: req.user.email,
    role: req.user.role,
  });
});

// Worker-only dashboard
router.get("/worker", auth, role(["Worker"]), (req, res) => {
  res.status(200).json({
    message: `Hello Worker: ${req.user.username}`,
    email: req.user.email,
    role: req.user.role,
  });
});

// ✅ Your custom dashboard route (for all logged-in users)
router.get("/dashboard", auth, (req, res) => {
  res.status(200).json({ message: `Welcome ${req.user.role}` });
});

module.exports = router;
