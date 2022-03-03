import Traveler from './classes/Traveler';
import Trip from './classes/Trip';
import TravelRepo from './classes/TravelRepo';
import domUpdates from './DOM-updates';
import {fetchData, postData} from './apiCalls'

let travelers;
let trips;
let travelRepo;
let currentTraveler;

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
  trips = tripsData.map(trip => console.log('trip', trip));
//   console.log(tripsData)
  console.log(trips[0].name)

  const travelerID = getRandomTraveler(travelers)
  travelRepo = new TravelRepo(travelers, trips);
  currentTraveler = travelRepo.findCurrentTraveler(travelerID)
  console.log(currentTraveler)
  travelRepo.getTripsForCurrentTraveler(travelerID)
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