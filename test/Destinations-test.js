import { expect } from 'chai';
import Destination from '../src/classes/Destination';


describe('Destination', () => {

  let destination;
  const inputObject = {
    "id": 1,
    "destination": "Lima, Peru",
    "estimatedLodgingCostPerDay": 70,
    "estimatedFlightCostPerPerson": 400,
    "image": 'yes',
    "alt": "overview of city buildings"
  };

  beforeEach(() => {
    destination = new Destination(inputObject)
  });

  it('should be a function', () => {
    expect(Destination).to.be.a('function')
  });

  it('should have an id', () => {
    expect(destination.id).to.equal(1)
  });

  it('should have a name', () => {
    expect(destination.destination).to.equal("Lima, Peru")
  });

  it('should have an estimated lodging cost/day', () => {
    expect(destination.lodgingCostPerDay).to.equal(70)
  });

  it('should have an estimated flight cost', () => {
    expect(destination.flightCostPerPerson).to.equal(400)
  });

  it('should have an image', () => {
    expect(destination.image).to.equal('yes')
  });

  it('should have an alt tag', () => {
    expect(destination.alt).to.equal("overview of city buildings")
  })

})