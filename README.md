# Student Management System - Layered Architecture

## 📋 Project Information
- **Student Name:** [ณัฐกิตต์-แก้วคำยศ]
- **Student ID:** [67543210055-9]
- **Course:** ENGSE207 Software Architecture

## 🏗️ Architecture Style
Layered Architecture (3-tier)
- Presentation Layer
- Business Layer
- Data Layer

## 📂 Project Structure
[อธิบายโครงสร้างโฟลเดอร์]

<img width="295" height="580" alt="image" src="https://github.com/user-attachments/assets/f02dbcdd-e284-48d9-a6df-2e4c317ab6ee" />


## 🎯 Refactoring Summary

### ปัญหาของ Monolithic (เดิม):
- [
    - โค้ดทั้งหมดอยู่ในไฟล์เดียว ดูแลรักษายาก!

- Business logic ปะปนกับ routing และ database

- แก้ไขส่วนหนึ่งกระทบทั้งระบบ

- ทดสอบแยกส่วนไม่ได้

- ขยายระบบยาก]

### วิธีแก้ไขด้วย Layered Architecture:
- [แยก Controller ออกจาก Service และ Repository

Business logic อยู่ใน Service เท่านั้น

Database access ถูกจัดการผ่าน Repository

Validation แยกเป็น Validator โดยเฉพาะ

Error handling รวมศูนย์ที่ Middleware]

### ประโยชน์ที่ได้รับ:
- [รับความรู้ในการแก้ไขโค้ด

ได้เรียนรู้เกี่ยวกับการแก้ไขโค้ด

เรียนรู้เกี่ยวกับการแยกโค้ดโครงสร้าง]

## 🚀 How to Run

\`\`\`bash
# 1. Clone repository
git clone [https://github.com/nattakit1/midterm-individual-67543210055-9]

# 2. Install dependencies
npm install

# 3. Run server
npm start

# 4. Test API
# Open browser: http://localhost:3000
\`\`\`

## 📝 API Endpoints
[| Method | Endpoint                 | Description           |
| ------ | ------------------------ | --------------------- |
| GET    | /api/students            | Get all students      |
| GET    | /api/students/:id        | Get student by ID     |
| POST   | /api/students            | Create new student    |
| PUT    | /api/students/:id        | Update student        |
| PATCH  | /api/students/:id/gpa    | Update student GPA    |
| PATCH  | /api/students/:id/status | Update student status |
| DELETE | /api/students/:id        | Delete student        |
]
