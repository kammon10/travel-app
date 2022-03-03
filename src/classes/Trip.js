class Trip {
  constructor(input) {
    this.id = input.id;
    console.log(input)
    this.userID = input.userID;
    this.date = input.date
    this.destinationID = input.destinationID;
    this.travelers = input.travelers;
    this.date = input.date;
    this.duration = input.duration;
    this.status = input.status;
    this.suggestedActivities = input.suggestedActivities;
  }
}


export default Trip;