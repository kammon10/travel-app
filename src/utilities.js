const utilities = {
  date() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    let currentDate = `${yyyy}/${mm}/${dd}`;
    return currentDate;
  },

  travelID() {
    let date = new Date()
    let id = date.getTime().toString().split('').splice(10, 3).join('')
    return id
  }


}

export default utilities;