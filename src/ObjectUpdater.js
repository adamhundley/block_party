export function update(game) {
  updateObjects(game, 'partyPipes');
  updateObjects(game, 'pipeEntries');
  updateObjects(game, 'partySquare');
}

function updateObjects(game, group) {
  for (let i = 0; i < game.state[group].length; i++) {
    if (group === 'partySquare' && game.state[group][i].delete) {
      game.endGame();
    } else{
      game.state[group][i].render(game.state);
    }
  }
}
