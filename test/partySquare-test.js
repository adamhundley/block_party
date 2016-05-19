const chai = require('chai');
const assert = chai.assert;

const PartySquare = require('../src/PartySquare');

describe('PartySquare', function() {
  context('with default attributes', function() {
    var args = {x: 400,
                y: 600,
                onDie: 'onDie',
                };

    var partySquare = new PartySquare(args);

    it('should assign an x coordinate', function() {
      assert.equal(partySquare.x, 400);
    });

    it('should assign a y coordinate', function() {
      assert.equal(partySquare.y, 600);
    });

    it('should assign a height', function(){
      assert.equal(partySquare.height, 50);
    });

    it('should assign a width', function(){
      assert.equal(partySquare.width, 50);
    });

    it('should assign a gravity', function(){
      assert.equal(partySquare.gravity, true);
    });

    it('should assign a initialVelocity', function(){
      assert.equal(partySquare.initialVelocity, 5);
    });

    it('should assign a acceleration', function(){
      assert.equal(partySquare.acceleration, 1.5);
    });

    it('should assign a jetAcceleration', function(){
      assert.equal(partySquare.jetAcceleration, 1.004);
    });

    it('should assign a velocity', function(){
      assert.equal(partySquare.velocity, 5);
    });

    it('should assign a points', function(){
      assert.equal(partySquare.points, 0);
    });

    it('should assign a currentPipe', function(){
      assert.equal(partySquare.currentPipeIndex, 0);
    });

    it('should assign a onDie', function(){
      assert.equal(partySquare.onDie, 'onDie');
    });
  });

  // describe('render', function() {
  //   context('with default attributes', function() {
  //     var args = {x: 400,
  //                 y: 600,
  //                 onDie: 'onDie',
  //                 };
  //
  //     var partySquare = new PartySquare(args);
  //
  //     it('should assign an x coordinate', function() {
  //       assert.equal(partySquare.render(), 400);
  //     });
  //   });
  // });
});
