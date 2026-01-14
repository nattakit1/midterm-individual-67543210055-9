const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());

// ✅ serve frontend
app.use(express.static(path.join(__dirname, 'public')));

// API routes
const studentController = require('./src/presentation/studentController');
app.use('/api/students', studentController);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
