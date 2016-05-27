export function update(game) {
  if(game.state.inGame) {
    game.setState({
      currentScore: game.state.currentScore + game.state.partySquare[0].points
    });
  }
}

export function updateTopScore(game, firebase) {
  updateUserTopScore(game);
  updateGlobalTopScore(game, firebase);
}

function updateUserTopScore(game) {
  if(game.state.currentScore > game.state.topScore){
    game.setState({topScore: game.state.currentScore});
    localStorage.topscore = game.state.currentScore;
  }
}

function updateGlobalTopScore(game, firebase) {
  globalTopScore(firebase, game);
  if(game.state.currentScore > game.state.globalTopScore){
    firebase.set({
      topscore: game.state.topScore
    });
    game.setState({globalTopScore: game.state.currentScore});
  }
}

export function globalTopScore(firebase, game) {

  let topScore = null;

  firebase.once('value').then(function(snapshot){
    topScore = snapshot.val().topscore
    game.setState({
      globalTopScore: topScore
    })
  });
};
