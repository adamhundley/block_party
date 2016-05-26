import * as firebaseDB from './firebase';

export function update(game) {
  if(game.state.inGame) {
    game.setState({
      currentScore: game.state.currentScore + game.state.partySquare[0].points
    });
  }
}

export function updateTopScore(game) {
  debugger
  updateUserTopScore(game);
  updateGlobalTopScore(game);
}

function updateUserTopScore(game) {
  if(game.state.currentScore > game.state.topScore){
    game.setState({topScore: game.state.currentScore});
    localStorage.topscore = game.state.currentScore;
  }
}

function updateGlobalTopScore(game) {
  if(game.state.topScore > game.state.globalTopScore){
    firebaseDB.ref('highscore/').set({
      topscore: game.state.topScore
    })
  }
}
