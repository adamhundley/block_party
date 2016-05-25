export default class ObjectManager {
  constructor(game) {
    this.game = game;
  }

  update(state) {
    this.updateObjects(state, 'partyPipes');
    this.updateObjects(state, 'pipeEntries');
    this.updateObjects(state, 'partySquare');
  }

  updateObjects(state, group){
    for (let i = 0; i < state[group].length; i++) {
      if (group === 'partySquare' && state[group][i].delete) {
        this.game.endGame();
      } else{
        state[group][i].render(state);
      }
    }
  }
}
