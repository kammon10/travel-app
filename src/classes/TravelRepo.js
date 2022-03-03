class TravelRepo {
  constructor(allTravelers, allTrips) {
    this.travelers = allTravelers;
    this.trips = allTrips;
    this.currentTraveler;
  }

  findCurrentTraveler(id) {
    const travelerInfo = this.travelers.find(traveler => traveler.id === id)
    this.currentTraveler = travelerInfo
    return travelerInfo
  }

  getTripsForCurrentTraveler(id) {
    const trips = this.trips.filter(trip => trip.userID === id)
    return trips
  }
}

export default TravelRepo;