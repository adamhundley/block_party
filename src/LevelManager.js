import PartyPipe from './PartyPipe';
import PipeEntry from './PipeEntry';
import PartySquare from './PartySquare';
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
    return this["create" + objectType](level, state);
  }

  createPartyPipe(level, state){
    return new PartyPipe(level(state));
  }

  createPipeEntry(level, state){
    return new PipeEntry(state, level(state));
  }

  createPartySquare(level, state){
    return new PartySquare(state, level(state));
  }

  manageIntervals(pipeIntervals, state){
    state.nextLevel += 1;
    let currentLevel = this.currentLevel(state);
    new IntervalManager().levelUp(pipeIntervals, state, currentLevel);
  }

  unpauseGame(pipeIntervals, state){
    new IntervalManager().setInterval(pipeIntervals, state);
  }

  currentLevel(state){
    if(!state.currentScore || state.currentScore < 750){
      state.currentLevel = 1;
      return levelOne;
    } else if (state.currentScore < 2000) {
      state.currentLevel = 2;
      return levelTwo;
    } else if (state.currentScore < 5000) {
      state.currentLevel = 3;
      return levelThree;
    } else if (state.currentScore < 10000) {
      state.currentLevel = 4;
      return levelFour;
    } else {
      state.currentLevel = 5;
      return levelFive;
    }
  }
}
