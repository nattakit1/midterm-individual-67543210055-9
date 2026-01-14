// src/business/services/studentService.js
const studentRepository = require('../../data/repositories/studentRepository');
const studentValidator = require('../validators/studentValidator');

class StudentService {
    async getAllStudents({ major = null, status = null } = {}) {
        if (major) studentValidator.validateMajor(major);
        if (status) studentValidator.validateStatus(status);

        const students = await studentRepository.findAll(major, status);

        const total = students.length;
        const active = students.filter(s => s.status === 'active').length;
        const graduated = students.filter(s => s.status === 'graduated').length;
        const suspended = students.filter(s => s.status === 'suspended').length;
        const avgGPA =
            total === 0
                ? 0
                : (
                      students.reduce((sum, s) => sum + (s.gpa || 0), 0) /
                      total
                  ).toFixed(2);

        return {
            students,
            statistics: {
                total,
                active,
                graduated,
                suspended,
                avgGPA: Number(avgGPA)
            }
        };
    }

    async getStudentById(id) {
        studentValidator.validateId(id);

        const student = await studentRepository.findById(id);
        if (!student) {
            const err = new Error('Student not found');
            err.name = 'NotFoundError';
            throw err;
        }

        return student;
    }

    async createStudent(studentData) {
        studentValidator.validateStudent(studentData);
        studentValidator.validateStudentCode(studentData.student_code);
        studentValidator.validateEmail(studentData.email);
        studentValidator.validateMajor(studentData.major);

        return await studentRepository.create(studentData);
    }

    async updateStudent(id, studentData) {
        studentValidator.validateId(id);
        studentValidator.validateStudent(studentData);

        const student = await studentRepository.findById(id);
        if (!student) {
            const err = new Error('Student not found');
            err.name = 'NotFoundError';
            throw err;
        }

        return await studentRepository.update(id, studentData);
    }

    async updateGPA(id, gpa) {
        studentValidator.validateId(id);
        studentValidator.validateGPA(gpa);

        const student = await studentRepository.findById(id);
        if (!student) {
            const err = new Error('Student not found');
            err.name = 'NotFoundError';
            throw err;
        }

        return await studentRepository.updateGPA(id, gpa);
    }

    async updateStatus(id, status) {
        studentValidator.validateId(id);
        studentValidator.validateStatus(status);

        const student = await studentRepository.findById(id);
        if (!student) {
            const err = new Error('Student not found');
            err.name = 'NotFoundError';
            throw err;
        }

        if (student.status === 'withdrawn') {
            const err = new Error('Cannot change withdrawn student status');
            err.name = 'ConflictError';
            throw err;
        }

        return await studentRepository.updateStatus(id, status);
    }

    async deleteStudent(id) {
        studentValidator.validateId(id);

        const student = await studentRepository.findById(id);
        if (!student) {
            const err = new Error('Student not found');
            err.name = 'NotFoundError';
            throw err;
        }

        if (student.status === 'active') {
            const err = new Error('Cannot delete active student');
            err.name = 'ConflictError';
            throw err;
        }

        await studentRepository.delete(id);
    }
}

module.exports = new StudentService();
