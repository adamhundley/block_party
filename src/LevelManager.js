import PartyPipe from './PartyPipe';
import PipeEntry from './PipeEntry';
import PartySquare from './PartySquare';
import IntervalManager from './IntervalManager';
import {levelOne} from './levels/_levelOne';
import {levelTwo} from './levels/_levelTwo';
import {levelThree} from './levels/_levelThree';
import {levelFour} from './levels/_levelFour';
import {levelFive} from './levels/_levelFive';
import {levelSix} from './levels/_levelSix';

export default class LevelManager {
  createObject(state, objectType){
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
    let levelInfo = [
      {levelFunc: levelOne, threshold: 750, level: 1},
      {levelFunc: levelTwo, threshold: 2000, level: 2},
      {levelFunc: levelThree, threshold: 5000, level: 3},
      {levelFunc: levelFour, threshold: 10000, level: 4},
      {levelFunc: levelFive, threshold: 15000, level: 5},
      {levelFunc: levelSix, threshold: 1000000, level: 6}
    ];

    if(!state.currentScore){
      state.currentLevel = 1;
      return levelOne;
    } else {
      for (var i = 0; i < levelInfo.length; i++) {
        if(state.currentScore < levelInfo[i].threshold) {
          state.currentLevel = levelInfo[i].level;
          return levelInfo[i].levelFunc;
        }
      }
    };
  }
}
