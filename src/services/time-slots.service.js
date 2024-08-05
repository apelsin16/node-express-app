import { Lesson } from '../mongo/lesson';
import { TimeSlot } from '../mongo/time-slot';
import { datesAreCorrect } from '../utilities';
import { TeachersService } from './teachers.service';

export class TimeSlotsService {
  constructor () {
    this.teachersService = new TeachersService();
  }

  async addSlot(teacherId, body) {
    const { start, end } = body;
    
    const teacher = await this.teachersService.getTeacherById(teacherId);

    if (!teacher) {
      throw new Error('Викладача не знайдено');
    }

    if (!datesAreCorrect(start, end)) {
      throw new Error('Перевірте будь ласка дати');
    }

    const lesson = await Lesson.findOne({
      teacher: teacherId,
      start,
      end,
    });

    if (lesson) {
      throw new Error('На цей час у Вас заплановане заняття');
    }

    const existingSlot = await TimeSlot.findOne({
      teacher: teacherId,
      start,
      end,
    });

    if (existingSlot) {
      throw new Error('Цей час вже заблоковано');
    }

    const slot = new TimeSlot({
      teacher: teacherId,
      start,
      end,
    });

    await slot.save();

    return slot.toResponse();
  }

  async getSlots(teacher) {
    const slots = await TimeSlot.find({
      teacher,
    });

    return slots.map(slot => slot.toResponse());
  }
}