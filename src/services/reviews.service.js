import { Review } from '../mongo/review';
import { Teacher } from '../mongo/teacher';

import pubsub from '../pubsub';

export class ReviewsService {
  async addReview(studentId, body) {
    const { text, teacherId } = body;

    const teacher = await Teacher.findById(teacherId);

    if (!teacher) {
      throw new Error('Викладач не знайдений');
    }

    const review = new Review({
      text,
      teacher: teacherId,
      student: studentId,
    });

    await review.save();

    const response = review.toResponse();

    await pubsub.publish('NEW_REVIEW', { reviewAdded: response });

    return response;
  }
}