const express = require('express');
const router = express.Router();
const studentRepo = require('../data/studentRepository');

// ✅ GET ALL STUDENTS
router.get('/', async (req, res) => {
  try {
    const students = await studentRepo.findAll();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ CREATE STUDENT
router.post('/', async (req, res) => {
  const { student_code, first_name, last_name, email, major } = req.body;

  if (!student_code || !first_name || !last_name || !email || !major) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    const newStudent = await studentRepo.insert({
      student_code,
      first_name,
      last_name,
      email,
      major
    });

    res.status(201).json(newStudent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
