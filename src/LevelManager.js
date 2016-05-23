import PartyPipe from './PartyPipe';
import PipeEntry from './PipeEntry';
import IntervalManager from './IntervalManager';
import {levelOne} from './levels/_levelOne';
import {levelTwo} from './levels/_levelTwo';
import {levelThree} from './levels/_levelThree';
import {levelFour} from './levels/_levelFour';
import {levelFive} from './levels/_levelFive';


export default class LevelManager {
  createObject(state, objectType){
    return this.manageObjects(state, objectType);
  }

  manageObjects(state, objectType){
    let currentLevel = this.currentLevel(state);
    return this.attributes(state, this.currentLevel(state), objectType);
  }

  attributes(state, level, objectType){
    return this["create" + objectType](level, state)
  }

  createPartyPipe(level, state){
    return new PartyPipe(level(state));
  }

  createPipeEntry(level, state){
    return new PipeEntry(state)
  }

  manageIntervals(pipeIntervals, state){
    if(state.currentLevel === state.nextLevel){
      state.nextLevel++;

      let currentLevel = this.currentLevel(state)
      new IntervalManager().levelUp(pipeIntervals, state, currentLevel);
    }
  }

  currentLevel(state){
    if(state.currentScore < 5){
      //make 1000
      return levelOne
    } else if (state.currentScore < 10) {
      //make 3000
      state.currentLevel = 2;
      return levelTwo
    } else if (state.currentScore < 6000) {
      state.currentLevel = 3;
      return levelThree
    }
  }
}
