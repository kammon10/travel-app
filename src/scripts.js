import Traveler from './classes/Traveler';
import Trip from './classes/Trip';
import TravelRepo from './classes/TravelRepo';
import domUpdates from './DOM-updates';
import {fetchData, postData} from './apiCalls'

let travelers;
let trips;
let travelRepo;
let currentTraveler;
let currentTrips;

//querySelectors

//eventListeners
window.addEventListener('load', fetchAllData)


//functions
function fetchAllData() {
  Promise.all([fetchData('travelers'), fetchData('trips')])
    .then(data => {
      initializeData(data[0].travelers, data[1].trips)
    })
}


function initializeData(travelerData, tripsData) {
  travelers = travelerData.map(traveler => new Traveler(traveler));
  trips = tripsData.map(trip => new Trip(trip));
  const travelerID = getRandomTraveler(travelers)
  console.log(travelerID)
  travelRepo = new TravelRepo(travelers, trips);
  currentTraveler = travelRepo.findCurrentTraveler(travelerID)
  console.log(currentTraveler)
  currentTrips = travelRepo.getTripsForCurrentTraveler(travelerID)
  console.log(currentTrips)
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