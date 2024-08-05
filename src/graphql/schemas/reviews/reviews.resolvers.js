import { withFilter } from 'graphql-subscriptions';

import { StudentsService } from '../../../services/students.service';
import { TeachersService } from '../../../services/teachers.service';
import { ReviewsService } from '../../../services/reviews.service';

import pubsub from '../../../pubsub';

const studentsService = new StudentsService();
const teachersService = new TeachersService();
const reviewsService = new ReviewsService();

export default {
  Mutation: {
    addReview: (parent, { body }, { user }) => reviewsService.addReview(user.id, body),
  },
  Review: {
    student: (parent) => studentsService.getStudentById(parent.student),
    teacher: (parent) => teachersService.getTeacherById(parent.teacher),
  },
  Subscription: {
    reviewAdded: {
      subscribe: withFilter(
        () =>  pubsub.asyncIterator('NEW_REVIEW'),
        (payload, variables, { user }) => {
          return (
            payload.reviewAdded.teacher.toString() === user?.id
          );
        },
      ),
    }
  }
}