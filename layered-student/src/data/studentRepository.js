const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbPath = path.join(__dirname, '../../students.db');
const db = new sqlite3.Database(dbPath);

// สร้าง table
db.run(`
CREATE TABLE IF NOT EXISTS students (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  student_code TEXT UNIQUE,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  major TEXT,
  gpa REAL,
  status TEXT DEFAULT 'active'
)
`);

const findAll = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM students', [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

const insert = (s) => {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO students
      (student_code, first_name, last_name, email, major)
      VALUES (?, ?, ?, ?, ?)
    `;
    db.run(
      sql,
      [s.student_code, s.first_name, s.last_name, s.email, s.major],
      function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID, ...s });
      }
    );
  });
};

const updateGPA = (id, gpa) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE students SET gpa = ? WHERE id = ?`;
    db.run(sql, [gpa, id], function (err) {
      if (err) reject(err);
      else resolve({ id, gpa });
    });
  });
};


// ✅ EXPORT ให้ครบ
module.exports = {
  findAll,
  insert,
  updateGPA
};
