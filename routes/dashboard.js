const express = require("express");
const auth = require("C:UsershimakDownloadsAuth-Backend/middleware/auth");
const role = require("C:UsershimakDownloadsAuth-Backend/middleware/role");

const router = express.Router();

// Manager-only dashboard
router.get("/manager", auth, role(["Manager"]), (req, res) => {
  res.json({ message: `Welcome Manager: ${req.user.email}` });
});

// Example: Worker-only dashboard
router.get("/worker", auth, role(["Worker"]), (req, res) => {
  res.json({ message: `Hello Worker: ${req.user.email}` });
});

module.exports = router;
