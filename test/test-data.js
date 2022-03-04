const testData = {
  travelerData: [
    {
      "id": 1,
      "name": "Ham Leadbeater",
      "travelerType": "relaxer",
    }, {
      "id": 2,
      "name": "Rachael Vaughten",
      "travelerType": "thrill-seeker",
    }, {
      "id": 3,
      "name": "Sibby Dawidowitsch",
      "travelerType": "shopper",
    }
  ],

  tripsData: [
    {
      "id": 1,
      "userID": 44,
      "destinationID": 49,
      "travelers": 1,
      "date": "2022/09/16",
      "duration": 8,
      "status": "approved",
      "suggestedActivities": []
    },
    {
      "id": 2,
      "userID": 35,
      "destinationID": 25,
      "travelers": 5,
      "date": "2022/10/04",
      "duration": 18,
      "status": "approved",
      "suggestedActivities": []
    }  
  ],
  destinationsData: [
    {
      "id": 2,
      "destination": "Stockholm, Sweden",
      "estimatedLodgingCostPerDay": 100,
      "estimatedFlightCostPerPerson": 780,
      // eslint-disable-next-line max-len
      "image": "https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
      "alt": "city with boats on the water during the day time"
    },
    {
      "id": 3,
      "destination": "Sydney, Austrailia",
      "estimatedLodgingCostPerDay": 130,
      "estimatedFlightCostPerPerson": 950,
      // eslint-disable-next-line max-len
      "image": "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
      "alt": "opera house and city buildings on the water with boats"
    },
    {
      "id": 4,
      "destination": "Cartagena, Colombia",
      "estimatedLodgingCostPerDay": 65,
      "estimatedFlightCostPerPerson": 350,
      // eslint-disable-next-line max-len
      "image": "https://images.unsplash.com/photo-1558029697-a7ed1a4b94c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
      "alt": "boats at a dock during the day time"
    },
    {
      "id": 5,
      "destination": "Madrid, Spain",
      "estimatedLodgingCostPerDay": 150,
      "estimatedFlightCostPerPerson": 650,
      "image": "https://images.unsplash.com/photo-1543785734-4b6e564642f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
      "alt": "city with clear skys and a road in the day time"
    }     
  ]
}

export default testData;