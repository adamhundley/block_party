import BlockPartyView from './BlockPartyView';
import PartySquare from './PartySquare';
import PipeEntry from './PipeEntry';
import LevelManager from './LevelManager';
import IntervalManager from './IntervalManager';

export class BlockParty extends BlockPartyView {
  constructor(){
    super();
    this.state = {
      inGame: false,
      paused: false,
      partySquare: [],
      partyPipes: [],
      pipeEntries: [],
      topScore: localStorage.topscore || 0,
      levelManager: new LevelManager(),
      context: null,
      screen: {
        width: window.innerWidth,
        height: window.innerHeight,
        ratio: window.devicePixelRatio || 1
      }
    };
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeys.bind(this, true));
    window.addEventListener('resize',  this.handleResize.bind(this));

    const context = this.refs.canvas.getContext('2d');
    this.setState({context: context});
    this.startGame();
    requestAnimationFrame(() => {this.update();});
  }

  startGame(){
    this.setState({
      inGame: true,
      currentScore: 0,
      currentLevel: 1,
      nextLevel: 1,
    });
    this.createPartySquare(this.state);
  }

  resetState(){
    this.setState({
      partyPipes: [],
      partySquare: [],
      pipeEntries: []
    });
  }

  restartGame(){
    this.resetState();
    this.startGame();
  }

  update() {
    const context = this.state.context;
    context.save();
    context.scale(this.state.screen.ratio, this.state.screen.ratio);
    context.clearRect(0, 0, this.state.screen.width, this.state.screen.height);
    this.updateObjects(this.state.partyPipes, 'partyPipes');
    this.updateObjects(this.state.pipeEntries, 'pipeEntries');
    this.updateObjects(this.state.partySquare, 'partySquare');
    if(this.state.inGame){this.addScore(this.state.partySquare[0].points);}
    this.manageIntervals();
    context.restore();
    // Next frame
    if(!this.state.paused) {this.animation = requestAnimationFrame(() => {this.update();});}
  }

  pipeIntervals(){
    return function(){
      this.createPartyPipe(this.state);
      this.createPipeEntry(this.state);
    }.bind(this);
  }

  manageIntervals(){
    if(this.state.currentLevel === this.state.nextLevel){
      // this.setState({nextLevel: this.state.nextLevel++})
      this.state.levelManager.manageIntervals(this.pipeIntervals(), this.state);
    }
  }

  endGame(){
    this.setState({inGame: false});
    this.state.partySquare.splice(0, 1);
    this.updateTopScore();
  }

  createPartySquare(state) {
    let partySquare = state.levelManager.createObject(state, 'PartySquare')
    this.addObjectToState(partySquare, 'partySquare')
  }

  createPartyPipe(state){
    let partyPipe = state.levelManager.createObject(state, 'PartyPipe');
    this.addObjectToState(partyPipe, 'partyPipes');
  }

  createPipeEntry(state){
    let pipeEntry = state.levelManager.createObject(state, 'PipeEntry');
    this.addObjectToState(pipeEntry, 'pipeEntries');
  }

  addObjectToState(object, type){
    this.state[type].push(object);
  }

  updateObjects(items, group){
    for (let i = 0; i < items.length; i++) {
      if (group === 'partySquare' && items[i].delete) {
        this.endGame();
      }else{
        items[i].render(this.state);
      }
    }
  }

  addScore(points){
    this.setState({
      currentScore: this.state.currentScore + points
    });
  }

  updateTopScore() {
    if(this.state.currentScore > this.state.topScore){
      this.setState({topScore: this.state.currentScore});
      localStorage.topscore = this.state.currentScore;
    }
  }

  handleResize() {
    this.setState({
      screen: {
        width: window.innerWidth,
        height: window.innerHeight,
        ration: window.devicePixelRatio || 1
      }
    });
  }

  togglePause(){
    this.setState({paused: !this.state.paused});
    this.gamePauser();
  }

  gamePauser(){
    if(this.state.paused){
      clearInterval(this.state.pipeInterval);
    } else {
      this.resetInterval();
    }
  }

  resetInterval() {
    new IntervalManager().setInterval(this.pipeIntervals(), this.state);
    this.update();
  }

  handleKeys(value, e){
    if(this.state.inGame){
      this.state.partySquare[0].respondToUser(e.keyCode, this.state);
    }

    if(this.state.inGame && e.keyCode === 32){
      this.togglePause();
    }

    if(!this.state.inGame && e.keyCode === 13){
      this.restartGame();
    }
  }
}
