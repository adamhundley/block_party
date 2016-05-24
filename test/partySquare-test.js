const chai = require('chai');
const expect = chai.expect;

const PartySquare = require('../src/PartySquare');

describe('PartySquare', function() {
  context('with default attributes', function() {
    var args = {x: 400,
                y: 600,
                onDie: 'onDie',
                };

    var partySquare = new PartySquare(args);

    it('should assign an x coordinate', function() {
      expect(partySquare.x).to.equal(400);
    });

    it('should assign a y coordinate', function() {
      expect(partySquare.y).to.equal(600);
    });

    it('should assign a height', function(){
      expect(partySquare.height).to.equal(50);
    });

    it('should assign a width', function(){
      expect(partySquare.width).to.equal(50);
    });

    it('should assign a gravity', function(){
      expect(partySquare.gravity).to.equal(true);
    });

    it('should assign a initialVelocity', function(){
      expect(partySquare.initialVelocity).to.equal(5);
    });

    it('should assign a acceleration', function(){
      expect(partySquare.acceleration).to.equal(1.5);
    });

    it('should assign a jetAcceleration', function(){
      expect(partySquare.jetAcceleration).to.equal(1.004);
    });

    it('should assign a velocity', function(){
      expect(partySquare.velocity).to.equal(5);
    });

    it('should assign a points', function(){
      expect(partySquare.points).to.equal(0);
    });

    it('should assign a currentPipe', function(){
      expect(partySquare.currentPipeIndex).to.equal(0);
    });

    it('should assign a onDie', function(){
      expect(partySquare.onDie).to.equal('onDie');
    });
  });

  // describe('destroy', function() {
  //   context('with default attributes', function() {
  //     var args = {x: 400,
  //                 y: 600,
  //                 onDie: function(){},
  //                 };
  //
  //     var partySquare = new PartySquare(args);
  //
  //     it('destroys the partySquare', function() {
  //       partySquare.destroy();
  //       expect(partySquare.instanceof()).to.equal(400);
  //     });
  //   });
  // });
});
