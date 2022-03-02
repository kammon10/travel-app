class TravelRepo {
  constructor(allTravelers, allTrips) {
    this.travelers = allTravelers;
    this.trips = allTrips;
  }

  findCurrentTraveler = (id) => {
   const travelerInfo = this.travelers.find(traveler => traveler.id === id)
   return travelerInfo
  }
}

export default TravelRepo;