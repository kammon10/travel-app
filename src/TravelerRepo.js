class TravelerRepo {
  constructor(allTravelers, allTrips) {
    this.travelers = allTravelers;
    this.trips = trips;
  }

  findCurrentTraveler = (id) => {
   const travelerInfo = this.travelers.find(traveler => traveler.id === id)
   console.log(travelerInfo)
   return travelerInfo
  }
}