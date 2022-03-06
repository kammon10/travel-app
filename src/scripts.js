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
const checkPriceBtn = document.querySelector('.check-price-btn');
const submitRequestBtn = document.querySelector('.request-trip-btn');
const requestTripForm = document.querySelector('.request-trip-form');
const homePageBtn = document.querySelector('.home-page-btn');
const greetingMessage = document.querySelector('.greeting-js');
const loginPage = document.querySelector('.login-page-js');
const userName = document.querySelector('.username-field');
const password = document.querySelector('.password-field');
const loginBtn = document.querySelector('.login-submit');
const homePage = document.querySelector('.display-homepage');
const logOutBtn = document.querySelector('.log-out-btn');
const loginForm = document.querySelector('.login-form');
const errorMessage = document.querySelector('.invaled-user');
const agentHomePage = document.querySelector('.display-agent-page');
const agentTripRequests = document.querySelector('.agent-pending-trips');
const agentUpcomingTrips = document.querySelector('.agent-upcoming-trips');
const searchClients = document.querySelector('.client-search');
const submitClientSearchBtn = document.querySelector('.submit-client-search')



//eventListeners

bookNewTripBtn.addEventListener('click', formView);
checkPriceBtn.addEventListener('click', function(event) {
  displayCost(event)
})
submitRequestBtn.addEventListener('click', function(event) {
  submitRequest(event)
});
requestTripForm.addEventListener('change', activateFormButtons);
homePageBtn.addEventListener('click', homePageView);
loginBtn.addEventListener('click', function(event) {
  logIn(event)
});
logOutBtn.addEventListener('click', logOut);


//functions
function logIn(e) {
  e.preventDefault()
  console.log('here')
  let userNameIndex8 = userName.value.charAt(8)
  let userNameIndex9 = userName.value.charAt(9);
  let userID = Number(`${userNameIndex8}${userNameIndex9}`);
  if (password.value === 'travel' && userName.value === `agency`) {
    loginForm.reset()
    agencyLogin()
  } else if (
    password.value === 'travel' && userName.value === `traveler${userID}`
  ) {
    customerLogin(userID) 
  } 
    // show([errorMessage])
}

function agencyLogin() {
  fetchAllData(null)
}

function customerLogin(id) {
  fetchAllData(id)
}


function fetchAllData(userId) {
  Promise.all([fetchData('travelers'), fetchData('trips'), fetchData('destinations')])
    .then(data => {
      if (userId === null) {
        initalizeAgencyData(data[0].travelers, data[1].trips, data[2].destinations)
      }
      initializeUserData(data[0].travelers, data[1].trips, data[2].destinations, userId)
    })
}

function initalizeAgencyData(travelerData, tripsData, destinationsData) {
 travelers = travelerData.map(traveler => new Traveler(traveler));
  trips = tripsData.map(trip => new Trip(trip));
  destinations = destinationsData.map(dest => new Destination(dest));
  travelRepo = new TravelRepo(travelers, trips, destinations);
  updateAgentDashboard()
}

function initializeUserData(travelerData, tripsData, destinationsData, id) {
  hide([errorMessage])
  travelers = travelerData.map(traveler => new Traveler(traveler));
  trips = tripsData.map(trip => new Trip(trip));
  destinations = destinationsData.map(dest => new Destination(dest));
  travelRepo = new TravelRepo(travelers, trips, destinations);
  if (id > 0 && id <= travelRepo.travelers.length) {
    currentTraveler = travelRepo.getCurrentTraveler(id)
    currentTrips = travelRepo.getTripsForCurrentTraveler(id)
    updateDashboard()
  }
}

function updateAgentDashboard() {
  agencyHomePageView();
  updateTotalProfits();
  updateUpcomingTrips();
  updatePendingTrips();
}

function updateDashboard() {
  homePageView();
  updateGreetingMessage();
  updateTotalSpent();
  updateTrips();
}

function agencyHomePageView() {
  hide([homePage, loginPage])
  show([agentHomePage]);
}

function updateTotalProfits() {
  const spentByClients = travelRepo.getTotalIncomeForYear()
  const income = spentByClients * .1;
  domUpdates.displayIncome(income)
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
  console.log(trips)
  let year = utilities.date().split('/')[0];    
  let month = utilities.date().split('/')[1];
  let day = utilities.date().split('/')[2];
  let pastTrips = trips
  pastTrips.forEach(trip => {
    let ty = trip.date.split('/')[0];
    let td = trip.date.split('/')[2];
    let tm = trip.date.split('/')[1];
    if (trip.status === 'pending') {
      const dest = travelRepo.getDestinationForTrip(trip.destinationID).destination;
      domUpdates.displayPendingTrips(trip, dest)
    } else if ((ty >= year && tm > month) || (ty >= year && tm === month && td > day)) {
      const dest = travelRepo.getDestinationForTrip(trip.destinationID).destination;
      domUpdates.displayFutureTrips(trip, dest);
    } else {
      const pastDest = travelRepo.getDestinationForTrip(trip.destinationID).destination;
      domUpdates.displayPastTrips(trip, pastDest);
    }
  });
}

function formView() {
  hide([displayTripsPage, greetingMessage]);
  show([formPage, homePageBtn]);
  // setMinDates()
  getDestinationsForForm();
}

function homePageView() {
  hide([formPage, homePageBtn, loginPage]);
  show([homePage, displayTripsPage, greetingMessage])
}

function logOut() {
  hide([homePage]);
  show([loginPage]);
  loginForm.reset()
}


function getDestinationsForForm() {
  const allDest = travelRepo.destinations.map(dest => dest.destination);
  domUpdates.addDestToForm(allDest);
  utilities.travelID();
}

function displayCost(e) {
  e.preventDefault();
  const trip = pendingTripObject();
  const total = travelRepo.getCostForTrip(trip);
  domUpdates.displayTotalCostForTrip(total);
}

function activateFormButtons() {
  if (departDateInput.value && returnDateInput.value && travelersInput.value && destinationInput.value) {
    checkPriceBtn.classList.remove('disabled')
    submitRequestBtn.classList.remove('disabled')
    domUpdates.displayTotalCostForTrip('')
    checkPriceBtn.disabled = false;
    submitRequestBtn.disabled = false;
    pendingTripObject()
  }
}

//should I make variables for the keys or keep the functions in the 
//object?
function pendingTripObject() {
  const destID = travelRepo.getDestByName(destinationInput.value).id;
  const newTripRequest = {
    id: parseInt(utilities.travelID()),
    userID: currentTraveler.id,
    date: departDateInput.value.split('-').join('/'),
    destinationID: parseInt(destID),
    travelers: parseInt(travelersInput.value),
    duration: parseInt(findTripDuration(departDateInput.value, returnDateInput.value)),
    status: 'pending',
    suggestedActivities: []
  }
  return newTripRequest
}

function submitRequest(e) {
  e.preventDefault();
  const newTripRequest = pendingTripObject();
  console.log(newTripRequest);
  postData(newTripRequest, 'trips');
  domUpdates.displayPendingTrips(newTripRequest, destinationInput.value);
  requestTripForm.reset();
  checkPriceBtn.classList.add('disabled');
  submitRequestBtn.classList.add('disabled');
  domUpdates.displayTotalCostForTrip('');
  domUpdates.submitTripRequest()
}

function findTripDuration(startDate, endDate) {
  const date1 = new Date(startDate);
  const date2 = new Date(endDate);
  const oneDay = 1000 * 60 * 60 * 24;
  const changeInTime = date2.getTime() - date1.getTime()
  const totalDays = Math.round(changeInTime / oneDay);
  return totalDays
}


function displayImages() {
  //function in travelRepo returns all images in array 
  //set a timeout function that will pass a new image to domUpdates every
  //5 seconds.
  //invoke this function on page load.
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

///missing a function that checks that all fields are filled.
//when all fields are filled out the disabled buttons will be activated.
//when a form is filled out, activate both buttons
//make a card of the input. pass in the card object 
//into the function to get cost,
// if submit request button is clicked, pass the card object
//into the domUpdats function.

//set an event Listener on the form.////