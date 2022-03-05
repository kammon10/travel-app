/* eslint-disable max-len */
import utilities from '../utilities';
class TravelRepo {
  constructor(allTravelers, allTrips, allDestinations) {
    this.travelers = allTravelers;
    this.trips = allTrips;
    this.currentTraveler;
    this.destinations = allDestinations;
  }

  getCurrentTraveler(id) {
    const travelerInfo = this.travelers.find(traveler => traveler.id === id)
    this.currentTraveler = travelerInfo
    return travelerInfo
  }

  getDestinationForTrip(id) {
    const findDest = this.destinations.find(dest => dest.id === id)
    return findDest
  }

  getDestByName(destination) {
    const getDest = this.destinations.find(dest => dest.destination === destination)
    return getDest
  }

  getTripsForCurrentTraveler(id) {
    const trips = this.trips.filter(trip => trip.userID === id)
    this.currentTraveler.trips = trips
    return trips
  }

  //only select the trips === this year
  getTotalSpentPerTraveler() {
    let year = utilities.date().split('/')[0];
    const total = this.currentTraveler.trips.reduce((acc, trip) => {
      let ty = trip.date.split('/')[0]
      this.destinations.forEach(dest => {
        if ((dest.id === trip.destinationID) && (ty >= year)) {
          acc += dest.lodgingCostPerDay * trip.duration;
          acc += dest.flightCostPerPerson * trip.travelers;
        }
      });
      return acc
    }, 0);
    return total
  }

  getCostForTrip(obj) {
    //pass in object
    //iterate through the destinations array and match the destination
    const theDest = this.destinations.find(dest => dest.id === obj.destinationID)
    const estimatedCost = (obj.duration * theDest.lodgingCostPerDay) + (obj.travelers * theDest.flightCostPerPerson);
    const total = estimatedCost + (estimatedCost * .1)  
    return total
  }
}

export default TravelRepo;