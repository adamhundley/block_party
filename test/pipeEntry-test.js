const chai = require('chai');
const expect = chai.expect;

const PipeEntry = require('../src/PipeEntry');

describe('PipeEntry', function() {
  context('with default attributes', function() {
    var state = {screen: {height: 600,
                          width: 400
                        },
                partyPipes: [{width: 10,
                              color: "red",
                              speed: 1000
                              }]
                };

    var level = {entry: { inMotion: true,
                          gravity: true,
                          velocity: 6,
                          acceleration: 5
                        }};

    var pipeEntry = new PipeEntry(state, level);
    pipeEntry.height = 10;
    pipeEntry.y = 10;
    pipeEntry.color = 'red';

    it('should assign a margin', function(){
      expect(pipeEntry.margin).to.equal(65);
    });

    it('should assign a partyPipe', function(){
      expect(pipeEntry.partyPipe).to.be.an('object');
    });

    it('should assign an maxHeight', function() {
      expect(pipeEntry.maxHeight).to.equal(450);
    });

    it('should assign a minHeight', function() {
      expect(pipeEntry.minHeight).to.equal(300);
    });

    it('should assign a height', function(){
      expect(pipeEntry.height).to.equal(10);
    });

    it('should assign an x coordinate', function() {
      expect(pipeEntry.x).to.equal(400);
    });

    it('should assign a y coordinate', function() {
      expect(pipeEntry.y).to.equal(10);
    });

    it('should assign a width', function(){
      expect(pipeEntry.width).to.equal(10);
    });

    it('should assign a color', function(){
      expect(pipeEntry.color).to.equal('red');
    });
    it('should assign a speed', function(){
      expect(pipeEntry.speed).to.equal(1000);
    });

    it('should assign a inMotion', function(){
      expect(pipeEntry.inMotion).to.equal(true);
    });

    it('should assign a gravity', function(){
      expect(pipeEntry.gravity).to.equal(true);
    });

    it('should assign a velocity', function(){
      expect(pipeEntry.velocity).to.equal(6);
    });
    it('should assign a acceleration', function(){
      expect(pipeEntry.acceleration).to.equal(5);
    });
  });
});
