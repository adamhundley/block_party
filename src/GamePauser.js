import IntervalManager from './IntervalManager';

export function action(game) {
  game.setState({paused: !game.state.paused});
  pauseInterval(game);
}

export function pause(game) {
  game.setState({paused: true});
  pauseInterval(game);
}

export function unPause(game) {
  game.setState({paused: false});
  pauseInterval(game);
}

function pauseInterval(game) {
  if(game.state.paused){
    clearInterval(game.state.pipeInterval);
  } else {
    resetInterval(game);
  }
}

function resetInterval(game) {
  new IntervalManager().setInterval(game.pipeIntervals(), game.state);
  game.updateGame();
}
