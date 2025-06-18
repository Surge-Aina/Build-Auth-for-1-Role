const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = async function (req, res, next) {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Match the token payload key (userId, not id)
    req.user = await User.findById(decoded.userId).select("-password");

    if (!req.user) return res.status(404).json({ message: "User not found" });

    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
};
