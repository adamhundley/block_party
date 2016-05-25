import React, { Component } from 'react';
import {GameRecap} from './components/GameRecap';
import {GameInfo} from './components/GameInfo';
import EventHandler from './EventHandler';
import LevelManager from './LevelManager';
import * as ObjectUpdater from './ObjectUpdater';
import * as Scoreboard from './Scoreboard';
import * as GamePauser from './GamePauser';

export class BlockParty extends Component {
  constructor(){
    super();
    this.state = {
      inGame: true,
      paused: false,
      partySquare: [],
      partyPipes: [],
      pipeEntries: [],
      topScore: localStorage.topscore || 0,
      levelManager: new LevelManager(),
      screen: {
        width: window.innerWidth,
        height: window.innerHeight,
        ratio: window.devicePixelRatio || 1
      }
    };
  }

  componentDidMount() {
    const eventHandler = new EventHandler(this);
    const context = this.refs.canvas.getContext('2d');
    this.setState({context: context});
    this.startGame();
    requestAnimationFrame(() => {this.updateGame();});
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

  updateGame() {
    const context = this.state.context;
    context.save();
    context.scale(this.state.screen.ratio, this.state.screen.ratio);
    context.clearRect(0, 0, this.state.screen.width, this.state.screen.height);
    ObjectUpdater.update(this);
    Scoreboard.update(this);
    this.manageIntervals();
    context.restore();
    // Next frame
    if(!this.state.paused) {this.animation = requestAnimationFrame(() => {this.updateGame();});}
  }

  pauseGame(){
    this.setState({paused: !this.state.paused});
    GamePauser.action(this, this.pipeIntervals());
  }

  endGame(){
    this.setState({inGame: false});
    this.state.partySquare.splice(0, 1);
    Scoreboard.updateTopScore(this);
  }

  restartGame(){
    this.resetState();
    this.startGame();
  }

  resetState(){
    this.setState({
      partyPipes: [],
      partySquare: [],
      pipeEntries: []
    });
  }

  pipeIntervals(){
    return function(){
      this.createPartyPipe(this.state);
      this.createPipeEntry(this.state);
    }.bind(this);
  }

  manageIntervals(){
    if(this.state.currentLevel === this.state.nextLevel){
      this.state.levelManager.manageIntervals(this.pipeIntervals(), this.state);
    }
  }

  createPartySquare(state) {
    let partySquare = state.levelManager.createObject(state, 'PartySquare');
    this.addObjectToState(partySquare, 'partySquare');
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

  render() {
    return (
      <div>
        <GameRecap game={this.state} />
        <GameInfo game={this.state} />
        <canvas moz-opaque ref="canvas"
          width={this.state.screen.width * this.state.screen.ratio}
          height={this.state.screen.height * this.state.screen.ratio}
        />
      </div>
    );
  }
}
