import Traveler from './classes/Traveler';
import Trip from './classes/Trip';
import domUpdates from './DOM-updates';
import {fetchData, postData} from './apiCalls'

let travelers;
let trips;

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
  console.log(currentTravelerID)
  travelerRepo = new TravelerRepo(travelers)
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