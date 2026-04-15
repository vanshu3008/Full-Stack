const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  const { email, password, role } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ msg: "User exists" });

  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashed, role });

  await user.save();
  res.json({ msg: "Registered" });
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ msg: "Invalid password" });

  const token = jwt.sign(
    { id: user._id, role: user.role, email: user.email },
    process.env.JWT_SECRET
  );

  res.json({ token });
});

// GET USERS (ADMIN)
router.get("/users", auth, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ msg: "Admin only" });

  const users = await User.find().select("-password");
  res.json(users);
});

// DELETE USER
router.delete("/users/:id", auth, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ msg: "Admin only" });

  await User.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});

module.exports = router;