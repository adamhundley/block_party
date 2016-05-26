export function update(game) {
  if(game.state.inGame) {
    game.setState({
      currentScore: game.state.currentScore + game.state.partySquare[0].points
    });
  }
}

export function updateTopScore(game) {
  if(game.state.currentScore > game.state.topScore){
    game.setState({topScore: game.state.currentScore});
    localStorage.topscore = game.state.currentScore;
  }
}
