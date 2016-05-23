import React, { Component } from 'react';
import PartySquare from './PartySquare';
import PipeEntry from './PipeEntry';
import LevelManager from './LevelManager';

export class BlockParty extends Component {
  constructor(){
    super();
    this.state = {
      screen: {
        width: window.innerWidth,
        height: window.innerHeight,
        ratio: window.devicePixelRatio || 1
      },
      context: null,
      inGame: false,
      topScore: localStorage['topscore'] || 0,
      paused: false
    };
    this.partySquare =[];
    this.partyPipes = [];
    this.pipeEntries = [];
    this.pipeCount = 0;
    this.levelManager = new LevelManager();
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
      nextLevel: 1
    });
    this.setPipes();
    let partySquare = this.createPartySquare();
    this.createObject(partySquare, 'partySquare');
  }

  update() {
    const context = this.state.context;
    context.save();
    context.scale(this.state.screen.ratio, this.state.screen.ratio);
    context.clearRect(0, 0, this.state.screen.width, this.state.screen.height);
    this.updateObjects(this.partyPipes, 'partyPipes');
    this.updateObjects(this.pipeEntries, 'pipeEntries');
    this.updateObjects(this.partySquare, 'partySquare');
    if(this.state.inGame){this.addScore(this.partySquare[0].points);}
    this.manageIntervals();
    this.manageLevelObjects(this.state);
    context.restore();
    // Next frame
    if(!this.state.paused){this.animation = requestAnimationFrame(() => {this.update();})};
  }

  pipeIntervals(){
    return function(){
        this.createPartyPipe(this.state);
        this.createPipeEntry(this.state, this.partyPipes[this.partyPipes.length -1]);
        this.pipeCount += 1;
      }.bind(this);
  }

  manageIntervals(){
    this.levelManager.manageIntervals(this.pipeIntervals(), this.state);
  }

  endGame(){
    this.setState({inGame: false});
    this.updateTopScore();
  }

  createPartySquare() {
    return new PartySquare({
      x: this.state.screen.width/3,
      y: this.state.screen.height/2,
      create: this.createObject.bind(this),
      onDie: this.endGame.bind(this)
    });
  }

  createPartyPipe(state){
    let partyPipe = this.levelManager.createObject(state, 'PartyPipe');

    this.createObject(partyPipe, 'partyPipes');
  }

  createPipeEntry(state, partyPipe){
    let pipeEntry = new PipeEntry({
      state: state,
      partyPipe: partyPipe
    });
    this.createObject(pipeEntry, 'pipeEntries');
  }

  createObject(object, type){
    this[type].push(object);
  }

  updateObjects(items, group){
    let index = 0;
    for (let item of items) {
      if (item.delete) {
        this[group].splice(index, 1);
      }else{
        items[index].render(this.state, this);
      }
      index++;
    }
  }

  setPipes() {
    this.partyPipes = [];
    this.pipeEntries = [];
    this.pipeCount = 0;
    this.pipeCount = 0;
  }

  addScore(points){
    this.setState({
      currentScore: this.state.currentScore + points
    });
  }

  manageLevelObjects(state){
    this.levelManager.manageObjects(state);
  }


  updateTopScore() {
    if(this.state.currentScore > this.state.topScore){
      this.setState({topScore: this.state.currentScore});
      localStorage['topscore'] = this.state.currentScore;
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
      this.levelManager.setInterval(this.pipeIntervals(), this.state)
      this.update();
    }
  }

  handleKeys(value, e){
    if(this.state.inGame){
      this.partySquare[0].respondToUser(e.keyCode, this.state);
    }

    if(this.state.inGame && e.keyCode === 32){
      this.togglePause();

    }

    if(!this.state.inGame && e.keyCode === 13){
      this.startGame();
    }
  }

  render() {
    let endgame;
    let message;

    if(!this.state.inGame){
      if(this.state.currentScore >= parseInt(this.state.topScore)){
        message = `WOW! NEW TOP SCORE! ${this.state.currentScore}`;
      } else {
        message = `Score: ${this.state.currentScore}`;
      }

      endgame = (
        <div className="endgame">
          <h2>Game over.</h2>
          <h1>{message}</h1>
          <button
            onClick={ this.startGame.bind(this) }>
            try again
          </button>
        </div>
      );
    }

    return (
      <div>
        { endgame }
      <span className="score current-score" >Score: {this.state.currentScore}</span>
      <span className="score top-score" >Top Score: {this.state.topScore}</span>
      <span className="controls fade-out" >
        Use [←][↑][↓][→] to MOVE<br/>
        Use [A][S][D][F] to CHANGE COLORS
      </span>
        <canvas moz-opaque ref="canvas"
          width={this.state.screen.width * this.state.screen.ratio}
          height={this.state.screen.height * this.state.screen.ratio}
        />
      </div>
    );
  }
}
