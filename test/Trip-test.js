import { expect } from 'chai';
import Trip from '../src/classes/Trip';
import testData from './test-data';


describe('Trip', () => {
  let trip;
  let data

  beforeEach(() => {
    data = testData.tripsData[0] 
    trip = new Trip(data)
  })

  it('should be a function', () => {
    expect(Trip).to.be.a('function');
  })

  it('should be an instance of trip', () => {
    expect(trip).to.be.an.instanceof(Trip)
  })

  it('should have an id', () => {
    console.log('id:', trip.id)
    expect(trip.id).to.equal(1)
  })

  it.skip('should have a user ID', () => {
    expect(trip.userID).to.equal(44)
  })

  it.skip('should have a destinationID', () => {
    expect(trip.destinationID).to.equal(49)
  })

  it.skip('should have a number of travelers', () => {
    expect(trip.noOfTravelers).to.equal(1)
  })

  it.skip('should have a date', () => {
    expect(trip.date).to.equal("2022/09/16")
  })

  it.skip('should have a duration', () => { 
    expect(trip.duration).to.equal(8)
  })

  it.skip('should have a status', () => {
    expect(trip.status).to.equal("approved")
  })

  it.skip('should have a suggestedActivities', () => {
    expect(trip.suggestedActivities.length).to.equal(0)
  })
})