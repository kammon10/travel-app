import { expect } from 'chai';
import Traveler from '../src/classes/Traveler'
import testData from './test-data';



describe('Traveler', () => {

  let traveler;
  let data;
  

  beforeEach(() => {
    data =  testData.travelerData[0]
    traveler = new Traveler(data)
  });

  it('should be a function', () => {
    expect(Traveler).to.be.a('function')
  });

  it('should have an id', () => {
    expect(traveler.id).to.equal(1)
  });

  it('should have a name', () => {
    expect(traveler.name).to.equal("Ham Leadbeater")
  });

  it('should have a type', () => {
    expect(traveler.type).to.equal('relaxer')
  });
})