/* eslint-disable max-len */
import Traveler from './classes/Traveler';
import Trip from './classes/Trip';
import TravelRepo from './classes/TravelRepo';
import domUpdates from './DOM-updates';
import {fetchData, postData} from './apiCalls'
import Destination from './classes/Destination';
import utilities from './utilities';

let travelers;
let trips;
let destinations;
let travelRepo;
let currentTraveler;
let currentTrips;

//querySelectors

//eventListeners
window.addEventListener('load', fetchAllData)


//functions
function fetchAllData() {
  Promise.all([fetchData('travelers'), fetchData('trips'), fetchData('destinations')])
    .then(data => {
      initializeData(data[0].travelers, data[1].trips, data[2].destinations)
    })
}


function initializeData(travelerData, tripsData, destinationsData) {
  travelers = travelerData.map(traveler => new Traveler(traveler));
  trips = tripsData.map(trip => new Trip(trip));
  destinations = destinationsData.map(dest => new Destination(dest))
  const travelerID = getRandomTraveler(travelers)
  console.log(travelerID)
  travelRepo = new TravelRepo(travelers, trips, destinations);
  currentTraveler = travelRepo.getCurrentTraveler(travelerID)
  console.log(currentTraveler)
  currentTrips = travelRepo.getTripsForCurrentTraveler(travelerID)
  console.log(currentTrips)
  updateDashboard()
}

function getRandomTraveler(array) {
  let randomTraveler = Math.floor(Math.random() * array.length)
  if (randomTraveler) {
    return randomTraveler 
  } else {
    randomTraveler ++;
    return randomTraveler
  }
}

function updateDashboard() {
  updateTrips();
  updateTotalSpent()
}

function updateTotalSpent() {
  const total = travelRepo.getTotalSpentPerTraveler();
  domUpdates.displayTotalSpent(total);
 
}

function updateTrips() {
  trips = currentTraveler.trips;
  sortTrips(trips);
}

function sortTrips(trips) {
  let year = utilities.date().split('/')[0];    
  let month = utilities.date().split('/')[1];
  let day = utilities.date().split('/')[2];
  let pastTrips = trips
  pastTrips.forEach(trip => {
    let ty = trip.date.split('/')[0];
    let td = trip.date.split('/')[2];
    let tm = trip.date.split('/')[1];
    if ((ty === year && tm > month) || (ty === year && tm === month && td > day)) {
      const dest = travelRepo.getDestinationForTrip(trip.id)
      const futureTrip = pastTrips.splice(trip, 1)
      domUpdates.displayFutureTrips(futureTrip, dest)
    }
  });
  domUpdates.displayPastTrips(pastTrips)
}
//conditions to move trips out of past:
//year is the same but month is greater
//year and month are the same but day is greater

