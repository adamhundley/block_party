export function updateObjects(game) {
  execute(game, 'partyPipes');
  execute(game, 'pipeEntries');
  execute(game, 'partySquare');
}

function execute(game, group) {
  for (let obj of game.state[group]) {
    if (group === 'partySquare' && obj.delete) {
      game.endGame();
    } else{
      obj.render(game.state);
    }
  }
}
