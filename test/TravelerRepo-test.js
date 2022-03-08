import {expect} from 'chai';
import TravelRepo from '../src/classes/TravelRepo'
import Traveler from '../src/classes/TravelRepo'
import Trip from '../src/classes/Trip'
import Destination from '../src/classes/Destination'
import testData from './test-data';

describe('TravelRepo', () => {
  let traveler;
  let trip;
  let destination;
  let travelRepo;

  beforeEach(() => {
    traveler = new Traveler(testData.travelerData[0]);
    console.log(traveler)
    trip = new Trip(testData.tripsData[0]);
    destination = new Destination(testData.destinationsData[0]);
    travelRepo = new TravelRepo([traveler], [trip], [destination]);
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
     console.log(travelRepo.getCurrentTraveler(1))
    expect(travelRepo.getCurrentTraveler(1).name).to.equal("Ham Leadbeater")
  })
});