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

// ✅ UPDATE GPA
router.patch('/:id/gpa', async (req, res) => {
  const { id } = req.params;
  const { gpa } = req.body;

  if (gpa === undefined) {
    return res.status(400).json({ error: 'Missing GPA' });
  }

  try {
    await studentRepo.updateGPA(id, gpa);
    res.json({ message: 'GPA updated', id, gpa });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ CHANGE STATUS
router.patch('/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: 'Missing status' });
  }

  try {
    await studentRepo.updateStatus(id, status);
    res.json({ message: 'Status updated', id, status });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ DELETE STUDENT
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await studentRepo.remove(id);

    if (result.deleted === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json({ message: 'Student deleted', id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




module.exports = router;
