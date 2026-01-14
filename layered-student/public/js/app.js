// public/js/app.js

let currentFilter = 'all';

// โหลดข้อมูลตอนเปิดหน้า
document.addEventListener('DOMContentLoaded', () => {
  loadStudents();
});

// โหลด student จาก API
async function loadStudents() {
  const loading = document.getElementById('loading');
  const list = document.getElementById('student-list');

  loading.style.display = 'block';

  try {
    const students = await api.getAllStudents(); // API ส่ง array
    renderStudents(students);
  } catch (err) {
    alert('Load students failed');
    console.error(err);
  }

  loading.style.display = 'none';
}

// แสดง student
function renderStudents(students) {
  const list = document.getElementById('student-list');

  if (!Array.isArray(students) || students.length === 0) {
    list.innerHTML = '<p>No students</p>';
    return;
  }

  list.innerHTML = students.map(s => `
    <div class="student-card">
      <h3>${s.first_name} ${s.last_name}</h3>
      <p>🆔 ${s.student_code}</p>
      <p>📚 ${s.major}</p>
      <p>📊 GPA: ${(s.gpa ?? 0).toFixed(2)}</p>
      <p>Status: ${s.status ?? 'active'}</p>
    </div>
  `).join('');
}
