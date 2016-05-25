const chai = require('chai');
const expect = chai.expect;

const IntervalManager = require('../src/IntervalManager');

describe('IntervalManager', function() {
  context('with default attributes', function() {
    var pipeIntervals = { function(){} }

    var state = {intervalRate: 4000
                };

    var currentLevel = function levelOne(state){
      return {
        pipe: {
          rate: 3200
        }
      };
    }

    var intervalManager = new IntervalManager();

    intervalManager.levelUp(pipeIntervals, state, currentLevel)

    it('should change interval rate based on level pipe rate', function(){
      expect(state.intervalRate).to.equal(3200);
    });
  });
});
