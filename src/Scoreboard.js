export function update(game) {
  if(game.state.inGame) {
    game.setState({
      currentScore: game.state.currentScore + game.state.partySquare[0].points
    });
  }
}

export function updateTopScore(game, firebase) {
  updateLocalTopScore(game);
  checkForNewGlobalTopScore(game, firebase);
}

function updateLocalTopScore(game) {
  if(game.state.currentScore > game.state.topScore){
    game.setState({topScore: game.state.currentScore});
    localStorage.topscore = game.state.currentScore;
  }
}

function checkForNewGlobalTopScore(game, firebase) {
  globalScoreboard(firebase, game);
  if(game.state.currentScore > game.state.globalScoreBoard.topScores.fifth.score){
    game.setState({newTopScore: true});
  }
}

function setNewScoreAndUser(scoreboard, name, currentScore, rank) {
  scoreboard[rank].score = currentScore
  scoreboard[rank].name = name
}

function updateRank(scoreboard, newRank, oldRank) {
  scoreboard[newRank].score = scoreboard[oldRank].score
  scoreboard[newRank].name = scoreboard[oldRank].name
}

function updateFirst(scoreboard, name, currentScore) {
  updateRank(scoreboard, 'fifth', 'fourth')
  updateRank(scoreboard, 'fourth', 'third')
  updateRank(scoreboard, 'third', 'second')
  updateRank(scoreboard, 'second', 'first')
  setNewScoreAndUser(scoreboard, name, currentScore, 'first')
}

function updateSecond(scoreboard, name, currentScore) {
  updateRank(scoreboard, 'fifth', 'fourth')
  updateRank(scoreboard, 'fourth', 'third')
  updateRank(scoreboard, 'third', 'second')
  setNewScoreAndUser(scoreboard, name, currentScore, 'second')
}

function updateThird(scoreboard, name, currentScore) {
  updateRank(scoreboard, 'fifth', 'fourth')
  updateRank(scoreboard, 'fourth', 'third')
  setNewScoreAndUser(scoreboard, name, currentScore, 'third')
}

function updateFourth(scoreboard, name, currentScore) {
  updateRank(scoreboard, 'fifth', 'fourth')
  setNewScoreAndUser(scoreboard, name, currentScore, 'fourth')
}

export function updateGlobalScoreboard(game, firebase, name) {
  let currentScore = game.state.currentScore
  let scoreboard = game.state.globalScoreBoard.topScores

  if (currentScore > scoreboard.first.score) {
    updateFirst(scoreboard, name, currentScore);
  } else if (currentScore > scoreboard.second.score) {
    updateSecond(scoreboard, name, currentScore);
  } else if (currentScore > scoreboard.third.score) {
    updateThird(scoreboard, name, currentScore);
  } else if (currentScore > scoreboard.fourth.score) {
    updateFourth(scoreboard, name, currentScore);
  } else if (currentScore > scoreboard.fifth.score) {
    setNewScoreAndUser(scoreboard, name, currentScore, 'fifth')
  }
  updateFirebase(game, firebase);
}

function updateFirebase(game, firebase) {
  firebase.set({
    topScores: game.state.globalScoreBoard.topScores
  });
}

export function globalScoreboard(firebase, game) {
  let topScoreboard = null;

  firebase.once('value').then(function(snapshot){
    let topScoreboard = snapshot.val()
    game.state.globalScoreBoard = topScoreboard
    return topScoreboard
  }).then(function(){
    game.setState({
      globalTopScore: game.state.globalScoreBoard.topScores.first.score
    })
  });
};
