class Trip {
  constuctor(object) {
    this.id = object.id;
    this.userID = object.userID;
    this.destinationID = object.destinationID;
    this.travelers = object.travelers;
    this.date = object.date;
    this.duration = object.duration;
    this.status = object.status;
    this.suggestedActivities = object.suggestedActivities;
  }
}


export default Trip;