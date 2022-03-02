const domUpdates = {

  displayTotalSpent(total) {
    const totalSpent = document.querySelector('.total-spent')
    totalSpent.innerText = `You've spent ${total}`
  }

}

export default domUpdates;