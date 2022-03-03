/* eslint-disable max-len */
import Traveler from './classes/Traveler';
import Trip from './classes/Trip';
import TravelRepo from './classes/TravelRepo';
import domUpdates from './DOM-updates';
import {fetchData, postData} from './apiCalls'
import Destination from './classes/Destination'

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
  currentTraveler = travelRepo.findCurrentTraveler(travelerID)
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
  travelRepo.getTotalSpentPerTraveler();
  displayTrips();
}

function displayTotalSpent() {
 
}

function displayTrips() {

}