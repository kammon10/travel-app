/* eslint-disable max-len */
// import 


const domUpdates = {

  displayGreeting(user) {
    const greeting = document.querySelector('.greeting-js')
    greeting.innerText = `Welcome back ${user}`
  },

  displayTotalSpent(total) {
    const totalSpent = document.querySelector('.total-spent')
    totalSpent.innerText = `You've spent $${total}`
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

}

export default domUpdates;