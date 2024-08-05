import { TeachersService } from '../../../services/teachers.service';
import { TimeSlotsService } from '../../../services/time-slots.service';

const teachersService = new TeachersService();
const timeSlotsService = new TimeSlotsService();

export default {
  Query: {
    timeSlots: (parent, args, { user }) => timeSlotsService.getSlots(user.id),
  },
  Mutation: {
    addTimeSlot: (parent, { body }, { user }) => timeSlotsService.addSlot(user.id, body),
  },
  TimeSlot: {
    teacher: (parent) => teachersService.getTeacherById(parent.teacher),
  }
}