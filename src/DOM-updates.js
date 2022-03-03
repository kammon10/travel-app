/* eslint-disable max-len */
// import 


const domUpdates = {
  displayTotalSpent(total) {
    const totalSpent = document.querySelector('.total-spent')
    totalSpent.innerText = `You've spent $${total}`
  },

  displayPastTrips(trip, dest) {
    const pastTrips = document.querySelector('.past-trips-cards');
    pastTrips.innerHTML += `
     <div>
       <p>Date: ${trip.date}</p>
       <p>Destination: ${dest}</p>
       <p>Duration: ${trip.duration} days</p>
       </div>
    `;
  },

  displayFutureTrips(trip, dest) {
    const futureTrips = document.querySelector('.future-trips-cards');
    futureTrips.innerHTML += `
     <div class="trip">
     <p>Date: ${trip.date}</p>
     <p>Destination: ${dest}</p>
     <p>Duration: ${trip.duration} days</p>
     </div>
    `
  },

}

export default domUpdates;