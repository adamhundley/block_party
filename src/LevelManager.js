import PartyPipe from './PartyPipe';
import IntervalManager from './IntervalManager';
import {levelOne} from './levels/_levelOne';
import {levelTwo} from './levels/_levelTwo';
import {levelThree} from './levels/_levelThree';
import {levelFour} from './levels/_levelFour';
import {levelFive} from './levels/_levelFive';


export default class LevelManager {
  createObject(state, object){
    return this.manageObjects(state, object);
  }

  manageObjects(state, object){
    let currentLevel = this.currentLevel(state);
    return this.attributes(state, this.currentLevel(state));
  }

  attributes(state, level){
    return this.createPartyPipe(level(state));
  }

  createPartyPipe(attributes){
    return new PartyPipe(attributes);
  }

  manageIntervals(pipeIntervals, state){
    if(state.currentLevel === state.nextLevel){
      state.nextLevel++;

      let currentLevel = this.currentLevel(state)
      new IntervalManager().levelUp(pipeIntervals, state, currentLevel);
    }
  }

  currentLevel(state){
    if(state.currentScore < 100){
      return levelOne
    } else if (state.currentScore < 200) {
      state.currentLevel = 2;
      return levelTwo
    } else if (state.currentScore) {
      state.currentLevel = 3;
      return levelThree
    }
  }
}
