const express = require("express");
const router = express.Router();
const Report = require("../models/report");
const User = require("../models/user");
const verifyToken = require("../middleware/verifyToken");

const hierarchy = ["customer", "worker", "manager", "admin"];

// POST /api/report
router.post("/", verifyToken, async (req, res) => {
  try {
    const { reportedUserId, reason } = req.body;
    const reporter = req.user;

    const reportedUser = await User.findById(reportedUserId);
    if (!reportedUser)
      return res.status(404).json({ message: "Reported user not found" });

    const reporterIndex = hierarchy.indexOf(reporter.role);
    const reportedIndex = hierarchy.indexOf(reportedUser.role);

    if (reporterIndex === -1 || reportedIndex === -1) {
      return res.status(400).json({ message: "Invalid role detected" });
    }

    if (reporterIndex >= reportedIndex) {
      return res
        .status(403)
        .json({ message: "You can only report users above your role" });
    }

    const newReport = new Report({
      reporter: reporter.id,
      reportedUser: reportedUserId,
      reason,
    });

    await newReport.save();
    res.status(201).json({ message: "Report submitted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while submitting report" });
  }
});

module.exports = router;
