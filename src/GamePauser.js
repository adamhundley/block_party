import IntervalManager from './IntervalManager';

export function action(game){
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
