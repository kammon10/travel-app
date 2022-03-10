/* eslint-disable max-len */
import {expect} from 'chai';
import TravelRepo from '../src/classes/TravelRepo'
import Traveler from '../src/classes/Traveler'
import Trip from '../src/classes/Trip'
import Destination from '../src/classes/Destination'
import testData from './test-data';

describe('TravelRepo', () => {
  let travelRepo;
  let traveler1;
  let dest
  let trip
   
  beforeEach(() => {
    traveler1 = new Traveler(testData.travelerData[0]);
    dest = new Destination(testData.destinationsData[0]);
    trip = new Trip(testData.tripsData[0])
    travelRepo = new TravelRepo([traveler1], [trip], [dest]);
    console.log(travelRepo)
  });

  it('should be a function', () => {
    expect(TravelRepo).to.be.a('function')
  });

  it('should be an instance of travelRepo', () => {
    expect(travelRepo).to.be.an.instanceOf(TravelRepo)
  })

  it('should have an array of travelers', () => {
    expect(travelRepo.travelers.length).to.equal(1)
  })

  it('should have an array of trips', () => {
    expect(travelRepo.trips.length).to.equal(1)
  });

  it('should have an array of destinations', () => {
    expect(travelRepo.destinations.length).to.equal(1)
  });

  it('should be able to get a current traveler', () => {
    travelRepo.getCurrentTraveler(1)
    expect(travelRepo.getCurrentTraveler(1).name).to.equal("Ham Leadbeater")
  });

  it('should be able to get a traveler', () => {
    expect(travelRepo.getTravelerByName('Ham Leadbeater')).to.equal(traveler1)
  });

  it('should get a destination for a trip from the id', () => {
    expect(travelRepo.getDestinationForTrip(2).destination).to.equal("Stockholm, Sweden")
  });

  it.skip('should get a trip by the id', () => {
    expect(travelRepo.getTripByID(1)).to.equal(trip);
  });

  it('should get a users trips', () => {
    travelRepo.getCurrentTraveler(1)
    expect(travelRepo.getTripsForCurrentTraveler(2)).to.equal(travelRepo.currentTraveler.trips)
  });

  it('should get the total Spent per traveler', () => {
    travelRepo.getCurrentTraveler(1)
    expect(travelRepo.getTotalSpentPerTraveler()).to.equal(0)
  });

  it('should get the cost for a trip', () => {
    expect(travelRepo.getCostForTrip(testData.tripsData[0])).to.equal(3649.8)
  });

  it('should get all travelers names', () => {
    expect(travelRepo.getAllTravelerNames()[0]).to.equal('Ham Leadbeater')
  });

  it('should get the total profit for the year', () => {
    expect(travelRepo.getTotalIncomeForYear()).to.equal(158)
  });

});
