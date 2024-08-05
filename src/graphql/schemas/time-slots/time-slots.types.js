const TimeSlots = `
  input AddTimeSlot {
    start: Date!
    end: Date!
  }
  
  type Query {
    timeSlots: [TimeSlot] @isAuthorized(type: "TEACHER")
  }

  type Mutation {
    addTimeSlot(body: AddTimeSlot): TimeSlot @isAuthorized(type: "TEACHER")
  }
`;

export default TimeSlots;
