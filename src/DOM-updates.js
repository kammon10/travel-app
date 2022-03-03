/* eslint-disable max-len */
// import 


const domUpdates = {
  displayTotalSpent(total) {
    const totalSpent = document.querySelector('.total-spent')
    totalSpent.innerText = `You've spent $${total}`
  },

  displayPastTrips(trips) {
    const pastTrips = document.querySelector('.past-trips');
    trips.forEach(trip => pastTrips.innerHTML += `
     <div>
       <p>Date: ${trip.date}</p>
       <p>Destination:</p>
       <p>Duration: ${trip.duration} days</p>
       </div>
    `);
  },

  displayFutureTrips(trip, dest) {
    const futureTrips = document.querySelector('.future-trips');
    futureTrips.innerHTML += `
     <div>
     <p>Date: ${trip.date}</p>
     <p>Destination: ${dest}</p>
     <p>Duration: ${trip.duration} days</p>
     </div>
    `
  }

}

export default domUpdates;