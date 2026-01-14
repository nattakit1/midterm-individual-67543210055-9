// public/js/app.js

document.addEventListener('DOMContentLoaded', () => {
  loadStudents();
});

async function loadStudents() {
  const loading = document.getElementById('loading');
  loading.style.display = 'block';

  try {
    const response = await api.getAllStudents();

    console.log('API response = ', response);

    // ✅ ใช้ตรง ๆ ไม่ผ่าน data
    renderStudents(response.students);
    renderStatistics(response.statistics);

  } catch (err) {
    console.error(err);
    alert('Load students failed');
  }

  loading.style.display = 'none';
}


function renderStudents(students) {
  const list = document.getElementById('student-list');

  if (!students || students.length === 0) {
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

function renderStatistics(stat) {
  document.getElementById('stat-active').innerText = stat.active;
  document.getElementById('stat-graduated').innerText = stat.graduated;
  document.getElementById('stat-suspended').innerText = stat.suspended;
  document.getElementById('stat-total').innerText = stat.total;
  document.getElementById('stat-gpa').innerText = stat.avgGPA.toFixed(2);
}
