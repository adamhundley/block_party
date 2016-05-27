import { firebaseDb } from './firebase';

export function update(game) {
  if(game.state.inGame) {
    game.setState({
      currentScore: game.state.currentScore + game.state.partySquare[0].points
    });
  }
}

export function updateTopScore(game) {
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
  globalTopScore(game);
  if(game.state.currentScore > game.state.globalTopScore){
    firebaseDb.set({
      topScore: game.state.topScore
    });
    game.setState({globalTopScore: game.state.currentScore});
  }
}

export function globalTopScore(game) {
  let topScore = null;

  firebaseDb.once('value').then(function(snapshot){
    topScore = snapshot.val().topScore;
    game.setState({
      globalTopScore: topScore
    });
    return topScore;
  });
}
