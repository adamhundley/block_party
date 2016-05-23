export default class InvervalManager{
  levelUp(pipeIntervals, state, currentLevel){
    this.updateRate(currentLevel, state);
    clearInterval(state.pipeInterval);
    this.setInterval(pipeIntervals, state);
  }

  updateRate(currentLevel, state){
    state.intervalRate = currentLevel(state).pipe.rate;
  }

  setInterval(pipeIntervals, state){
    state.pipeInterval = setInterval(pipeIntervals, state.intervalRate);
  }
}
