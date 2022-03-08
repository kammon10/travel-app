/* eslint-disable max-len */
import Traveler from './classes/Traveler';
import Trip from './classes/Trip';
import TravelRepo from './classes/TravelRepo';
import domUpdates from './DOM-updates';
import {fetchData, postData, deleteData} from './apiCalls'
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
const upcomingTrips = document.querySelector('.agent-upcoming-trips');
const pendingTrips = document.querySelector('.agent-pending-trips');
const submitClientSearchBtn = document.querySelector('.submit-client-search');
const agencyLogoutBtn = document.querySelector('.agency-log-out-btn');
const clientDropDown = document.querySelector('.client-dropdown')




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
// loginBtn.addEventListener('click', function(event) {
//   logIn(event)
// });
logOutBtn.addEventListener('click', logOut);
agencyLogoutBtn.addEventListener('click', logOut);
pendingTrips.addEventListener('click', function(e) {
  changeCardState(e)
});
upcomingTrips.addEventListener('click', function(e) {
  changeCardState(e)
});
submitClientSearchBtn.addEventListener('click', function(e) {
  searchByClient(e)
});
window.addEventListener('load', fetchAllData(5)
)



//functions
// function logIn(e) {
//   e.preventDefault()
//   let userNameIndex8 = userName.value.charAt(8)
//   let userNameIndex9 = userName.value.charAt(9);
//   let userID = Number(`${userNameIndex8}${userNameIndex9}`);
//   if (password.value === 'travel' && userName.value === `agency`) {
//     loginForm.reset()
//     agencyLogin()
//   } else if (
//     password.value === 'travel' && userName.value === `traveler${userID}`
//   ) {
//     customerLogin(userID) 
//   } 
//     // show([errorMessage])
// }

// function agencyLogin() {
//   fetchAllData(null)
// }

// function customerLogin(id) {
//   fetchAllData(id)
// }


function fetchAllData(userId) {
  Promise.all([fetchData('travelers'), fetchData('trips'), fetchData('destinations')])
    .then(data => {
      // if (userId === null) {
      //   initalizeAgencyData(data[0].travelers, data[1].trips, data[2].destinations)
      // }
      initializeUserData(data[0].travelers, data[1].trips, data[2].destinations, userId)
    });
}


function initializeUserData(travelerData, tripsData, destinationsData, id) {
  // hide([])
  // show([homePage])
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


function updateDashboard() {
  homePageView();
  updateGreetingMessage();
  updateTotalSpent();
  updateTrips();
}

function updateAgentDashboard() {
  agencyHomePageView();
  updateTotalProfits();
  agencySortTrips(travelRepo.trips);
  updateClientDropdown();
}



// function updateTodaysTrips() {
//   let year = utilities.date().split('/')[0];    
//   let month = utilities.date().split('/')[1];
//   let day = utilities.date().split('/')[2];
//   travelRepo.trips.forEach(trip => {
//     let ty = trip.date.split('/')[0];
//     let td = trip.date.split('/')[2];
//     let tm = trip.date.split('/')[1];
//     if (ty === year && tm === month && td === day) {
//       const dest = travelRepo.getDestinationForTrip(trip.destinationID)
//       console.log('here', dest)
//       domUpdates.displayTodaysTrips(trip, dest.destination)
//     }
//   });
// }



function searchByClient(e) {
  e.preventDefault();
  const name = clientDropDown.value
  const info = travelRepo.getTravelerByName(name)
  const trips = travelRepo.getTripsForCurrentTraveler(info.id)
  agencySortTrips(trips)
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
    const dest = travelRepo.getDestinationForTrip(trip.destinationID)
    let ty = trip.date.split('/')[0];
    let td = trip.date.split('/')[2];
    let tm = trip.date.split('/')[1];
    if (trip.status === 'pending') {
      domUpdates.displayPendingTrips(trip, dest)
    } else if ((ty >= year && tm > month) || (ty >= year && tm === month && td > day)) {
      domUpdates.displayFutureTrips(trip, dest);
    } else {
      const pastDest = travelRepo.getDestinationForTrip(trip.destinationID);
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
  hide([formPage, homePageBtn]);
  show([homePage, displayTripsPage, greetingMessage])
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

// function setMinDates() {
//   const minDepart = document.querySelector('.departDate').attribute("min", utilities.date())
//   // console.log(minDepart.value)
//   document.querySelector('.return-date')
// }

// //should I make variables for the keys or keep the functions in the 
// //object?
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
  const dest = travelRepo.getDestByName(destinationInput.value)
  console.log('subm', newTripRequest);
  postData(newTripRequest, 'trips');
  domUpdates.displayPendingTrips(newTripRequest, dest);
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
//////////////////AGENCY FUNCTIONS/////////////////////////

function initalizeAgencyData(travelerData, tripsData, destinationsData) {
  travelers = travelerData.map(traveler => new Traveler(traveler));
  trips = tripsData.map(trip => new Trip(trip));
  destinations = destinationsData.map(dest => new Destination(dest));
  travelRepo = new TravelRepo(travelers, trips, destinations);
  updateAgentDashboard()
}

function updateClientDropdown() {
  const clients = travelRepo.getAllTravelerNames()
  domUpdates.displayNamesInDropdown(clients)
}


function agencyHomePageView() {
  hide([homePage, loginPage])
  show([agentHomePage]);
}

function updateTotalProfits() {
  const spentByClients = travelRepo.getTotalIncomeForYear()
  const income = spentByClients * .1;
  domUpdates.displayIncome(income);
}


function agencySortTrips(allTrips) {
  domUpdates.clearTrips()
  console.log(allTrips)
  let year = utilities.date().split('/')[0];    
  let month = utilities.date().split('/')[1];
  let day = utilities.date().split('/')[2];
  allTrips.forEach(trip => {
    console.log(trip)
    let ty = trip.date.split('/')[0];
    let td = trip.date.split('/')[2];
    let tm = trip.date.split('/')[1];
    console.log(ty)
    console.log(tm)
    console.log(td)
///////this trips for today needs to be updated//////
    if (trip.status === 'pending') {
      console.log('pending')
      const dest = travelRepo.getDestinationForTrip(trip.destinationID).destination;
      domUpdates.displayAgencyPendingTrips(trip, dest)
    } else if ((ty >= year && tm > month) || (ty >= year && tm === month && td > day)) {
      console.log('upcoming')
      const dest = travelRepo.getDestinationForTrip(trip.destinationID).destination;
      domUpdates.displayAgencyUpcomingTrips(trip, dest);
    }
  })
}

function changeCardState(e) {
  const li = e.target.parentElement 
  const card = li.parentElement
  const tripID = parseInt(card.className.split('-')[3])
  // const trip = travelRepo.getTripByID(tripID)
  if (e.target.className === 'approve-trip') {
    pendingTrips.removeChild(card);
    const updatedTrip = {
      id: tripID,
      status: 'approved',
      suggestedActivities: []
    }
    postData(updatedTrip, 'updateTrip')
  } else if (e.target.className === 'deny-trip') {
    pendingTrips.removeChild(card);
    deleteData(`trips/${tripID}`)
  } else if (e.target.className === 'cancel-trip') {
    upcomingTrips.removeChild(card)
    deleteData(`trips/${tripID}`)
  } 
}


function logOut() {
  hide([homePage, agentHomePage]);
  show([loginPage]);
  loginForm.reset()
}

function hide(input) {
  input.forEach(el => el.classList.add('hidden'));
}

function show(input) {
  input.forEach(el => el.classList.remove('hidden'))
}

