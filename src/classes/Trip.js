class Trip {
  constructor(input) {
    this.id = input.id;
    this.userID = input.userID;
    this.date = input.date;
    this.destinationID = input.destinationID;
    this.travelers = input.travelers;
    this.duration = input.duration;
    this.status = input.status;
    this.suggestedActivities = input.suggestedActivities;
  }
}


export default Trip;