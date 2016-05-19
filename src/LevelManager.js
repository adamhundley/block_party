import PartyPipe from './PartyPipe';
import * as levelOne from './levels/_levelOne';
import * as levelTwo from './levels/_levelTwo';

export default class LevelManager {
  createObject(state, object){
    return this.manageObjects(state, object);
  }

  createPartyPipe(attributes){
    return new PartyPipe(attributes);
  }

  manageObjects(state, object){
    let scope = this;
    if(state.currentScore < 200){
      return levelOne.attributes(state, object, scope);
    } else if (state.currentScore < 2000) {
      return levelTwo.attributes(state, object, scope);
    }
  }

}
