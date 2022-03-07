/* eslint-disable max-len */
import utilities from '../utilities';
class TravelRepo {
  constructor(allTravelers, allTrips, allDestinations) {
    this.travelers = allTravelers;
    this.trips = allTrips;
    this.currentTraveler;
    this.destinations = allDestinations;
  }

  getTotalIncomeForYear() {
    let year = utilities.date().split('/')[0];
    const totalspentByClients = this.trips.reduce((acc, trip) => {
      let ty = trip.date.split('/')[0]
      this.destinations.forEach(dest => {
        if ((dest.id === trip.destinationID) && (ty >= year)) {
          acc += dest.lodgingCostPerDay * trip.duration;
          acc += dest.flightCostPerPerson * trip.travelers;
        }
      });
      return acc
    }, 0)
    return totalspentByClients
  }

  getCurrentTraveler(id) {
    const travelerInfo = this.travelers.find(traveler => traveler.id === id)
    this.currentTraveler = travelerInfo
    return travelerInfo
  }

  getTravelerByName(name) {
    const traveler = this.travelers.find(trav => trav.name === name)
    return traveler
  }

  getDestinationForTrip(id) {
    const findDest = this.destinations.find(dest => dest.id === id)
    return findDest
  }

  getTripByID(id) {
    console.log(id)
    const thisTrip = this.trips.find(trip => trip.id === id)
    return thisTrip
  }

  getDestByName(destination) {
    const getDest = this.destinations.find(dest => dest.destination === destination)
    return getDest
  }

  getTripsForCurrentTraveler(id) {
    const trips = this.trips.filter(trip => trip.userID === id)
    if (this.currentTraveler) {
      this.currentTraveler.trips = trips
    }
    return trips
  }

  

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

  getCostForTrip(trip) {
    const theDest = this.destinations.find(dest => dest.id === trip.destinationID)
    const estimatedCost = (trip.duration * theDest.lodgingCostPerDay) + (trip.travelers * theDest.flightCostPerPerson);
    const total = estimatedCost + (estimatedCost * .1)  
    return total
  }

  getAllTravelerNames() {
    const travelerNames = this.travelers.map(traveler => traveler.name);
    return travelerNames
  }

  getdestImages() {
    
  }
}

export default TravelRepo;