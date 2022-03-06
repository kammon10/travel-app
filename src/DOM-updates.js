/* eslint-disable max-len */
// import 
const submitionNotice = document.querySelector('.submition-notice');


const domUpdates = {

  displayGreeting(user) {
    const greeting = document.querySelector('.greeting-js')
    greeting.innerText = `Welcome back ${user}`
  },

  displayTotalSpent(total) {
    const totalSpent = document.querySelector('.total-spent')
    totalSpent.innerText = `You've spent $${total} this year`
  },

  displayIncome(total) {
    const profitsThisYear = document.querySelector('.profits-this-year');
    profitsThisYear.innerText = `This years profits: $${total}`
  },

  displayPastTrips(trip, dest) {
    const pastTrips = document.querySelector('.past-trips-cards');
    pastTrips.innerHTML += `
     <div class="card">
       <p>Date: ${trip.date}</p>
       <p>Destination: ${dest}</p>
       <p>Duration: ${trip.duration} days</p>
       </div>
    `;
  },

  displayFutureTrips(trip, dest) {
    const futureTrips = document.querySelector('.future-trips-cards');
    futureTrips.innerHTML += `
     <div class="card">
     <p>Date: ${trip.date}</p>
     <p>Destination: ${dest}</p>
     <p>Duration: ${trip.duration} days</p>
     </div>
    `
  },

  submitTripRequest() {
    submitionNotice.innerText = `Your trip request has been succesfuly submitted.`
    setTimeout(this.resetSubmitionNotice, 4000)
  },

  resetSubmitionNotice() {
    submitionNotice.innerText = ''
  },

  displayPendingTrips(trip, dest) {
    const pendingTrips = document.querySelector('.pending-trips-cards');
    const pendingCardHeader = document.querySelector('.pending-card-header')
    pendingCardHeader.innerText = `Your Pending Trips`;
    pendingTrips.innerHTML += `
    <div class="card">
     <p>Date: ${trip.date}</p>
     <p>Destination: ${dest}</p>
     <p>Travelers: ${trip.travelers}
     <p>Duration: ${trip.duration} days</p>
     <p>Status: ${trip.status}</p>
     </div>
    `;
  },

  displayAgencyPendingTrips(trip, dest) {
    const agentPendingTrips = document.querySelector('.agent-pending-trips');
    const agentPendingHeader = document.querySelector('.agent-pending-header')
    agentPendingHeader.innerText = ` Pending Trips`;
    agentPendingTrips.innerHTML += `
    <div class="card">
     <P>TripId: ${trip.id}</p>
     <p>Date: ${trip.date}</p>
     <p>Destination: ${dest}</p>
     <p>Travelers: ${trip.travelers}
     <p>Duration: ${trip.duration} days</p>
     <p>Status: ${trip.status}</p>
     <div>
     <button class="approve-trip">Approve</button>
     <button class="deny-trip">Deny</button>
     </div>
     </div>
    `;
  },

  displayAgencyUpcomingTrips(trip, dest) {
    const agentUpcomingTrips = document.querySelector('.agent-upcoming-trips');
    const agentUpcomingHeader = document.querySelector('.agent-upcoming-header')
    agentUpcomingHeader.innerText = `Upcoming Trips`;
    agentUpcomingTrips.innerHTML += `
    <div class="card">
     <P>TripId: ${trip.id}</p>
     <p>Date: ${trip.date}</p>
     <p>Destination: ${dest}</p>
     <p>Travelers: ${trip.travelers}
     <p>Duration: ${trip.duration} days</p>
     <p>Status: Approved</p>
     <div>
     <button class="cancel-trip">Cancel</button>
     </div>
     </div>
    `;
  },

  addDestToForm(destinations) {
    const destinationDropdown = document.querySelector('.destination-dropdown')
    destinations.forEach(dest => {
      destinationDropdown.innerHTML += `
      <option value="${dest}">${dest}</option
      `
    })
  },

  displayTotalCostForTrip(cost) {
    const totalCostEst = document.querySelector('.total-cost-request');
    totalCostEst.innerText = `Price for this trip is $${cost}`
  }, 

}

export default domUpdates;