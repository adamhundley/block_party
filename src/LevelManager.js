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
    return this.manageObjects(state, objectType);
  }

  manageObjects(state, objectType){
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

  currentLevel({currentScore, currentLevel}){
    if (!currentScore) return levelOne;

    if (currentScore > 750)   { currentLevel = 1; }
    if (currentScore > 2000)  { currentLevel = 2; }
    if (currentScore > 5000)  { currentLevel = 3; }
    if (currentScore > 10000) { currentLevel = 4; }
    if (currentScore > 15000) { currentLevel = 5; }
    if (currentScore > 20000) { currentLevel = 6; }

    return [levelOne, levelTwo, levelThree][currentLevel - 1];

  }
}
