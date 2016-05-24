const chai = require('chai');
const expect = chai.expect;

const PartyPipe = require('../src/PartyPipe');

describe('PartyPipe', function() {
  context('with default attributes', function() {
    var args = {pipe: {x: 400,
                      y: 600,
                      height: 10,
                      width: 10,
                      color: "red",
                      speed: 1000
                    }};

    var partyPipe = new PartyPipe(args);

    it('should assign a height', function(){
      expect(partyPipe.height).to.equal(10);
    });

    it('should assign a width', function(){
      expect(partyPipe.width).to.equal(10);
    });

    it('should assign an x coordinate', function() {
      expect(partyPipe.x).to.equal(400);
    });

    it('should assign a y coordinate', function() {
      expect(partyPipe.y).to.equal(600);
    });

    it('should assign a color', function(){
      expect(partyPipe.color).to.equal('red');
    });

    it('should assign a speed', function(){
      expect(partyPipe.speed).to.equal(1000);
    });
  });

  // describe('render', function() {
  //   context('with default attributes', function() {
  //     var args = {pipe: {x: 400,
  //                       y: 600,
  //                       height: 10,
  //                       width: 10,
  //                       color: "red",
  //                       speed: 1000
  //                 }};
  //     var state =
  //
  //     var partyPipe = new PartyPipe(args);
  //
  //     it('renders the partyPipe', function() {
  //       partyPipe.render(state);
  //       expect(partyPipe.instanceof()).to.equal(400);
  //     });
  //   });
  // });
});
