class Destination {
  constructor(input) {
    this.id = input.id;
    this.destination = input.destination;
    this.lodgingCostPerDay = input.estimatedLodgingCostPerDay;
    this.flightCostPerPerson = input.estimatedFlightCostPerPerson;
    this.image = input.image
    this.alt = input.alt;
  }
  
}

export default Destination;