const express = require("express");
const Course = require("../models/Course");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// GET COURSES
router.get("/", auth, async (req, res) => {
  const courses = await Course.find().populate("students", "email");
  res.json(courses);
});

// ADD COURSE (ADMIN)
router.post("/", auth, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ msg: "Admin only" });

  const course = new Course(req.body);
  await course.save();
  res.json(course);
});

// ENROLL
router.post("/enroll/:id", auth, async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (course.availableSeats <= 0)
    return res.status(400).json({ msg: "No seats" });

  if (course.students.includes(req.user.id))
    return res.status(400).json({ msg: "Already enrolled" });

  course.students.push(req.user.id);
  course.availableSeats--;

  await course.save();
  res.json({ msg: "Enrolled" });
});

// DROP
router.post("/drop/:id", auth, async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course.students.includes(req.user.id))
    return res.status(403).json({ msg: "Not enrolled" });

  course.students = course.students.filter(
    (id) => id.toString() !== req.user.id
  );

  course.availableSeats++;
  await course.save();

  res.json({ msg: "Dropped" });
});

module.exports = router;