/* eslint-disable max-len */
// import 


const domUpdates = {

  displayGreeting(user) {
    const greeting = document.querySelector('.greeting-js')
    greeting.innerText = `Welcome back ${user}`
  },

  displayTotalSpent(total) {
    const totalSpent = document.querySelector('.total-spent')
    totalSpent.innerText = `You've spent $${total} this year`
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

  displayPendingTrips(trip, dest) {
    const pendingTrips = document.querySelector('.pending-trips-cards');
    const pendingCardHeader = document.querySelector('.pending-card-header')
    sectionHeader.innerText = `Your Pending Trips`;
    pendingTrips.innerHTML += `
    <div class="card">
     <p>Date: ${trip.date}</p>
     <p>Destination: ${dest}</p>
     <p>Travelers: ${trip.travelers}
     <p>Duration: ${trip.duration} days</p>
     <p>Status: Pending</p>
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