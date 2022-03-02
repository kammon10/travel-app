import { expect } from 'chai';
import Traveler from '../src/classes/Traveler'



describe('Traveler', () => {

  let traveler;
  const inputObject = {
    "id": 1,
    "name": "Ham Leadbeater",
    "travelerType": "relaxer",
  }

  beforeEach(() => {
    traveler = new Traveler(inputObject)
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