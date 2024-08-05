import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Student } from '../mongo/student';
import { Teacher } from '../mongo/teacher';
import { passwordIsCorrect } from '../utilities';
import { Admin } from '../mongo/admin';

export class AuthService {
  async signUpStudent(body) {
    const { firstName, lastName, email, password, skills } = body;

    const existingStudent = await Student.findOne({ email });

    if (existingStudent) {
      throw new Error('Студент з таким email вже існує');
    }

    if (!passwordIsCorrect(password)) {
      throw new Error('Пароль не відповідає вимогам');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = new Student({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      skills,
    });

    await student.save();

    return student.toResponse();
  }

  async signUpTeacher(body) {
    const { firstName, lastName, email, password, specialties } = body;

    const existingTeacher = await Teacher.findOne({ email });

    if (existingTeacher) {
      throw new Error('Викладач з таким email вже існує');
    }

    if (!passwordIsCorrect(password)) {
      throw new Error('Пароль не відповідає вимогам');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const teacher = new Teacher({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      specialties,
    });

    await teacher.save();

    return teacher.toResponse();
  }

  async loginStudent(body) {
    const { email, password } = body;

    const student = await Student.findOne({ email });

    if (!student) {
      throw new Error('Помилка авторизації');
    }

    if (!bcrypt.compareSync(password, student.password)) {
      throw new Error('Помилка авторизації');
    }

    student.online = true;

    await student.save();

    return jwt.sign({
      id: student._id.toString(),
      type: 'STUDENT',
    }, process.env.JWT_SECRET);
  }
  
  async loginTeacher(body) {
    const { email, password } = body;

    const teacher = await Teacher.findOne({ email });

    if (!teacher) {
      throw new Error('Помилка авторизації');
    }

    if (!bcrypt.compareSync(password, teacher.password)) {
      throw new Error('Помилка авторизації');
    }

    teacher.online = true;

    await teacher.save();

    return jwt.sign({
      id: teacher._id.toString(),
      type: 'TEACHER',
    }, process.env.JWT_SECRET);
  }

  async logoutStudent(studentId) {
    const student = await Student.findById(studentId);
  
    if (!student) {
      throw new Error('Студент не знайдений');
    }
  
    student.online = false;
  
    await student.save();
  
    return 'Ok';
  }
  
  async logoutTeacher(teacherId) {
    const teacher = await Teacher.findById(teacherId);
  
    if (!teacher) {
      throw new Error('Викладач не знайдений');
    }
  
    teacher.online = false;
  
    await teacher.save();
  
    return 'Ok';
  }

  async loginAdmin(body) {
    const { email, password } = body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      throw new Error('Помилка авторизації');
    }

    if (!bcrypt.compareSync(password, admin.password)) {
      throw new Error('Помилка авторизації');
    }

    admin.online = true;

    await admin.save();

    return jwt.sign({
      id: admin._id.toString(),
      type: 'ADMIN',
    }, process.env.JWT_SECRET);
  }

  async logoutAdmin(adminId) {
    const admin = await Admin.findById(adminId);
  
    if (!admin) {
      throw new Error('Адміністратор не знайдений');
    }
  
    admin.online = false;
  
    await admin.save();
  
    return 'Ok';
  }
}