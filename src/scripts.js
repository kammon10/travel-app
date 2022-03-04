/* eslint-disable max-len */
import Traveler from './classes/Traveler';
import Trip from './classes/Trip';
import TravelRepo from './classes/TravelRepo';
import domUpdates from './DOM-updates';
import {fetchData, postData} from './apiCalls'
import Destination from './classes/Destination';
import utilities from './utilities';
import './CSS/base.scss'

let travelers;
let trips;
let destinations;
let travelRepo;
let currentTraveler;
let currentTrips;

//querySelectors
const bookNewTripBtn = document.querySelector('.book-a-trip-btn');
const formPage = document.querySelector('.book-trip-page');
const displayTripsPage = document.querySelector('.display-all-trips');
const departDateInput = document.querySelector('.depart-date');
const returnDateInput = document.querySelector('.return-date');
const destinationInput = document.querySelector('.destination-dropdown');
const travelersInput = document.querySelector('.travelers');
const totalCostEst = document.querySelector('.total-cost-request');
const submitRequestBtn = document.querySelector('.request-trip-btn');


//eventListeners
window.addEventListener('load', fetchAllData);
bookNewTripBtn.addEventListener('click', displayForm);
submitRequestBtn.addEventListener('click', function(event) {
  submitRequest(event)})


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
  destinations = destinationsData.map(dest => new Destination(dest));
  const travelerID = getRandomTraveler(travelers)
  travelRepo = new TravelRepo(travelers, trips, destinations);
  currentTraveler = travelRepo.getCurrentTraveler(travelerID)
  console.log(currentTraveler)
  currentTrips = travelRepo.getTripsForCurrentTraveler(travelerID)
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
  updateGreetingMessage();
  updateTotalSpent();
  updateTrips();
}

function updateGreetingMessage() {
  domUpdates.displayGreeting(currentTraveler.name);
}

function updateTotalSpent() {
  const total = travelRepo.getTotalSpentPerTraveler()
  const totalPlusAgient = total + (total * .1)
  domUpdates.displayTotalSpent(totalPlusAgient);
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
  
    if (trip.status === 'pending') {
      const pendingTrip = pastTrips.splice(trip, 1)
      const pendingDest = travelRepo.getDestinationForTrip(trip.destinationID).destination
      domUpdates.displayPendingTrips(pendingTrip[0], pendingDest)
    } else if ((ty >= year && tm >= month && trip.status === 'approved') || (ty >= year && tm >= month && td > day && trip.status === 'approved')) {
      const futureTrip = pastTrips.splice(trip, 1)
      const dest = travelRepo.getDestinationForTrip(trip.destinationID).destination;
      domUpdates.displayFutureTrips(futureTrip[0], dest);
    } else {
      pastTrips.forEach(trip => {
        const pastDest = travelRepo.getDestinationForTrip(trip.destinationID).destination;
        domUpdates.displayPastTrips(trip, pastDest);
      });
    }
  });
}

function displayForm() {
  hide([displayTripsPage]);
  show([formPage]);
  // setMinDates()
  getDestinationsForForm()
}

function getDestinationsForForm() {
  const allDest = travelRepo.destinations.map(dest => dest.destination)
  domUpdates.addDestToForm(allDest)
  utilities.travelID()
}

//create a new trip to be displayed in the pending trips section
// create object and pass it into the domUpdate.displayPendingTrips(trip, dest)
function submitRequest(e) {
  e.preventDefault();

  const newTripRequest = {
    id: utilities.travelID(),
    userID: currentTraveler.id,
    date: departDateInput.value.split('-').join('/'),
    destinationID: travelRepo.getDestByName(destinationInput.value),
    travelers: travelersInput.value,
    duration: findTripDuration(departDateInput.value, returnDateInput.value),
    status: 'pending',
  }
  travelRepo.getCostForTrip(newTripRequest)
  domUpdates.displayPendingTrips(newTripRequest, destinationInput.value)
}

function findTripDuration(startDate, endDate) {
  const date1 = new Date(startDate);
  const date2 = new Date(endDate);
  const oneDay = 1000 * 60 * 60 * 24;
  const changeInTime = date2.getTime() - date1.getTime()
  const totalDays = Math.round(changeInTime / oneDay);
  return totalDays
}


// function setMinDates() {
//   const MinDepart = document.querySelector('.departDate').min = utilities.date()
//   document.querySelector('.return-date').min;
// }

function hide(input) {
  input.forEach(el => el.classList.add('hidden'));
}

function show(input) {
  input.forEach(el => el.classList.remove('hidden'))
}

//conditions to move trips out of past:
//year is the same but month is greater
//year and month are the same but day is greater

//getting destination for past trips:
//forEach trip, match the trip id to the destination id and return the dest.
//pass in trip and dest into the domUpdates file.
