import PartyPipe from './PartyPipe';
import * as levelOne from './levels/_levelOne';
import * as levelTwo from './levels/_levelTwo';
import * as levelThree from './levels/_levelThree';
import * as levelFour from './levels/_levelFour';
import * as levelFive from './levels/_levelFive';

export default class LevelManager {
  attributes(state, object, level){
    if(object === 'PartyPipe'){
      return this.createPartyPipe(level);
    }
  }

  createObject(state, object){
    return this.manageObjects(state, object);
  }

  createPartyPipe(attributes){
    return new PartyPipe(attributes);
  }

  manageObjects(state, object){
    if(state.currentScore < 100){
      return this.attributes(state, object, levelOne.partyPipe(state));
    } else if (state.currentScore < 200) {
      state.currentLevel = 2;
      return this.attributes(state, object, levelTwo.partyPipe(state));
    } else if (state.currentScore) {
      state.currentLevel = 3;
      return this.attributes(state, object, levelThree.partyPipe(state));
    }
  }

  setInterval(pipeIntervals, state){
    let level = state.currentLevel;
    if(level === 1){
      state.pipeInterval = setInterval(pipeIntervals, 4000);
    } else if (level === 2) {
      state.pipeInterval = setInterval(pipeIntervals, 3000);
    } else if (level === 3) {
      state.pipeInterval = setInterval(pipeIntervals, 2000);
    }
  }

  manageIntervals(pipeIntervals, state){
    clearInterval(state.pipeInterval);
    this.setInterval(pipeIntervals, state);
    state.nextLevel++;
  }
}
