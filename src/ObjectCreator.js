import LevelManager from './LevelManager';

export function create(game) {
  if(game.state.currentLevel === game.state.nextLevel){
    new LevelManager().manageIntervals(game.pipeIntervals(), game.state);
  }
}

export function createPartySquare(state) {
  let partySquare = new LevelManager().createObject(state, 'PartySquare');
  addObjectToState(state, partySquare, 'partySquare');
}

export function createPartyPipe(state){
  let partyPipe = new LevelManager().createObject(state, 'PartyPipe');
  addObjectToState(state, partyPipe, 'partyPipes');
}

export function createPipeEntry(state){
  let pipeEntry = new LevelManager().createObject(state, 'PipeEntry');
  addObjectToState(state, pipeEntry, 'pipeEntries');
}

function addObjectToState(state, object, type){
  state[type].push(object);
}
