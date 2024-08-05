const Review = `
  type Mutation {
    addReview(body: AddReviewBody!): Review @isAuthorized(type: "STUDENT")
  }

  type Subscription {
    reviewAdded: Review @isAuthorized(type: "TEACHER")
  }

  input AddReviewBody {
    text: String!
    teacherId: String!
  }
`;

export default Review;