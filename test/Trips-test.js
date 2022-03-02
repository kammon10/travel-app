import { expect } from 'chai';
import Trip from '../src/classes/Trips'


describe('Trip', () => {
  let trip;
  const object = {
    "id": 1,
    "userID": 44,
    "destinationID": 49,
    "travelers": 1,
    "date": "2022/09/16",
    "duration": 8,
    "status": "approved",
    "suggestedActivities": []
  }

  beforeEach(() => {
    trip = new Trip(object)
  })

  it('should be a function', () => {
    expect(Trip).to.be.a('function');
  })

  it('should be an instance of trip', () => {
    expect(trip).to.be.an.instanceof(Trip)
  })

  it('should have an id', () => {
    expect(trip.id).to.equal(1)
  })

  it('should have a user ID', () => {
    expect(trip.userID).to.equal(44)
  })

  it('should have a destinationID', () => {
    expect(trip.destinationID).to.equal(49)
  })

  it('should have a number of travelers', () => {
    expect(trip.noOfTravelers).to.equal(1)
  })

  it('should have a date', () => {
    expect(trip.date).to.equal("2022/09/16")
  })

  it('should have a duration', () => { 
    expect(trip.duration).to.equal(8)
  })

  it('should have a status', () => {
    expect(trip.status).to.equal("approved")
  })

  it('should have a suggestedActivities', () => {
    expect(trip.suggestedActivities.length).to.equal(0)
  })
})