const express = require('express');
const router = express.Router();

const studentService = require('../business/studentService');

// GET /api/students
router.get('/', async (req, res) => {
  try {
    const students = await studentService.getAll();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
