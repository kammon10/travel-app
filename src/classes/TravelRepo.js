class TravelRepo {
  constructor(allTravelers, allTrips, allDestinations) {
    this.travelers = allTravelers;
    this.trips = allTrips;
    this.currentTraveler;
    this.destinations = allDestinations;
  }

  findCurrentTraveler(id) {
    const travelerInfo = this.travelers.find(traveler => traveler.id === id)
    this.currentTraveler = travelerInfo
    return travelerInfo
  }

  getTripsForCurrentTraveler(id) {
    const trips = this.trips.filter(trip => trip.userID === id)
    this.currentTraveler.trips = trips
    return trips
  }

  getTotalSpentPerTraveler() {
    //match destinationId with currentUser.tripdestination id
    // multiply number of travelers by flightCostPerPerson and lodgingCostPerDay by trip.duation
    //return total

    const total = this.currentTraveler.trips.reduce((acc, trip) => {
      this.destinations.forEach(dest => {
        if (dest.id === trip.destinationID) {
          acc += dest.lodgingCostPerDay * trip.duration;
          acc += dest.flightCostPerPerson * trip.travelers;
        }
      });
      return acc
    }, 0);
    return total
  }
}

export default TravelRepo;