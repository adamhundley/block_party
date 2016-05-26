export function update(game) {
  updateObjects(game, 'partyPipes');
  updateObjects(game, 'pipeEntries');
  updateObjects(game, 'partySquare');
}

function updateObjects(game, group) {
  for (let obj of game.state[group]) {
    if (group === 'partySquare' && object.delete) {
      game.endGame();
    } else{
      object.render(game.state);
    }
  }
}
