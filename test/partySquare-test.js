const chai = require('chai');
const expect = chai.expect;

const PartySquare = require('../src/PartySquare');

describe('PartySquare', function() {
  context('with default attributes', function() {
    var state = {
                  screen: {
                  width: 400,
                  height: 600
                  },
                  colorManager: {
                  colorSample: function() {}
                  }
                };

    var partySquare = new PartySquare(state);

    it('should assign an x coordinate', function() {
      expect(partySquare.x).to.equal(133.33333333333334);
    });

    it('should assign a y coordinate', function() {
      expect(partySquare.y).to.equal(300);
    });

    it('should assign a height', function(){
      expect(partySquare.height).to.equal(25);
    });

    it('should assign a width', function(){
      expect(partySquare.width).to.equal(25);
    });

    it('should assign a gravity', function(){
      expect(partySquare.gravity).to.equal(true);
    });

    it('should assign a initialVelocity', function(){
      expect(partySquare.initialVelocity).to.equal(6);
    });

    it('should assign a acceleration', function(){
      expect(partySquare.acceleration).to.equal(1.5);
    });

    it('should assign a jetAcceleration', function(){
      expect(partySquare.jetAcceleration).to.equal(1.004);
    });

    it('should assign a velocity', function(){
      expect(partySquare.velocity).to.equal(6);
    });

    it('should assign a points', function(){
      expect(partySquare.points).to.equal(0);
    });

    it('should assign a currentPipe', function(){
      expect(partySquare.currentPipeIndex).to.equal(0);
    });
  });
});
