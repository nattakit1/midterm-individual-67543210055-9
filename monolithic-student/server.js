const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Database
const db = new sqlite3.Database('./students.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_code TEXT UNIQUE NOT NULL,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT NOT NULL,
      major TEXT NOT NULL,
      gpa REAL DEFAULT 0.0,
      status TEXT DEFAULT 'active'
    )
  `);
});

// Helpers
function getStats(callback) {
  db.all(`SELECT status, COUNT(*) as count FROM students GROUP BY status`, (err, rows) => {
    const stats = { active: 0, graduated: 0, suspended: 0, withdrawn: 0, total: 0, averageGPA: 0 };
    rows.forEach(r => {
      stats[r.status] = r.count;
      stats.total += r.count;
    });
    db.get(`SELECT AVG(gpa) as avg FROM students`, (err, row) => {
      stats.averageGPA = row.avg || 0;
      callback(stats);
    });
  });
}

// Routes
app.get('/api/students', (req, res) => {
  const { status, major } = req.query;
  let query = 'SELECT * FROM students WHERE 1=1';
  const params = [];

  if (status) {
    query += ' AND status=?';
    params.push(status);
  }
  if (major) {
    query += ' AND major=?';
    params.push(major);
  }

  db.all(query, params, (err, students) => {
    getStats(stats => {
      res.json({ students, statistics: stats });
    });
  });
});

app.get('/api/students/:id', (req, res) => {
  db.get('SELECT * FROM students WHERE id=?', [req.params.id], (err, row) => {
    if (!row) return res.status(404).json({ error: 'Student not found' });
    res.json(row);
  });
});

app.post('/api/students', (req, res) => {
  const { student_code, first_name, last_name, email, major } = req.body;
  db.run(
    `INSERT INTO students (student_code, first_name, last_name, email, major)
     VALUES (?, ?, ?, ?, ?)`,
    [student_code, first_name, last_name, email, major],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

app.put('/api/students/:id', (req, res) => {
  const { student_code, first_name, last_name, email, major } = req.body;
  db.run(
    `UPDATE students SET student_code=?, first_name=?, last_name=?, email=?, major=? WHERE id=?`,
    [student_code, first_name, last_name, email, major, req.params.id],
    err => {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ success: true });
    }
  );
});

app.patch('/api/students/:id/gpa', (req, res) => {
  db.run(
    `UPDATE students SET gpa=? WHERE id=?`,
    [req.body.gpa, req.params.id],
    () => res.json({ success: true })
  );
});

app.patch('/api/students/:id/status', (req, res) => {
  db.run(
    `UPDATE students SET status=? WHERE id=?`,
    [req.body.status, req.params.id],
    () => res.json({ success: true })
  );
});

app.delete('/api/students/:id', (req, res) => {
  db.run(`DELETE FROM students WHERE id=?`, [req.params.id], () => {
    res.json({ success: true });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
