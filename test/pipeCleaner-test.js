const chai = require('chai');
const expect = chai.expect;

const PipeCleaner = require('../src/PipeCleaner');

describe('PipeCleaner', function() {
  context('with default attributes', function() {
    var pipe = {y: 10,
                x: 10,
                height: 100,
                width: 100,
                color: 'red'};


    var pipeCleaner = new PipeCleaner(pipe);

    it('should assign a entryTop', function(){
      expect(pipeCleaner.entryTop).to.equal(10);
    });

    it('should assign a entryBottom', function(){
      expect(pipeCleaner.entryBottom).to.equal(110);
    });

    it('should assign an entranceX', function() {
      expect(pipeCleaner.entranceX).to.equal(10);
    });

    it('should assign a exitX', function() {
      expect(pipeCleaner.exitX).to.equal(110);
    });

    it('should assign a pipeColor', function(){
      expect(pipeCleaner.pipeColor).to.equal('red');
    });
  });
});
