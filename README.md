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

<img width="470" height="238" alt="image" src="https://github.com/user-attachments/assets/a558ee49-d4ae-4983-9fa4-80edced98e34" />

<img width="1579" height="690" alt="image" src="https://github.com/user-attachments/assets/045031b3-1a09-47e4-a9e4-b80a7b49b095" />

<img width="753" height="611" alt="image" src="https://github.com/user-attachments/assets/68a0bfdf-2763-48b4-9740-0a416d3c58bf" />

<img width="834" height="618" alt="image" src="https://github.com/user-attachments/assets/c3bb326d-0ac9-4b3c-893e-95db3e0520e8" />

<img width="1403" height="684" alt="image" src="https://github.com/user-attachments/assets/2681dab4-5bef-4c89-8278-25e9babbc556" />





