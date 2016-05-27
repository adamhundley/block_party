import React, { Component } from 'react';
import { GameRecap } from './components/GameRecap';
import { GameInfo } from './components/GameInfo';
import { mountEventHandler } from './eventHandler';
import * as ObjectCreator from './ObjectCreator';
import { updateObjects } from './updateObjects';
import * as Scoreboard from './Scoreboard';
import { togglePause } from './togglePause';
import LevelManager from './LevelManager';

export class BlockParty extends Component {
  constructor(){
    super();
    this.state = {
      partySquare: [],
      topScore: localStorage.topscore || 0,
      globalTopScore: Scoreboard.globalTopScore(this),
      screen: {
        width: window.innerWidth,
        height: window.innerHeight,
        ratio: window.devicePixelRatio || 1
      }
    };
  }

  componentDidMount() {
    mountEventHandler(this);
    this.setState({context: this.refs.canvas.getContext('2d')});
    this.startGame();
    requestAnimationFrame(() => {this.updateGame();});
  }

  startGame(){
    this.setState({
      inGame: true,
      paused: false,
      partyPipes: [],
      pipeEntries: [],
      currentScore: 0,
      currentLevel: 1,
      nextLevel: 1,
    });
    ObjectCreator.createPartySquare(this.state);
  }

  updateGame() {
    const context = this.state.context;
    context.save();
    context.scale(this.state.screen.ratio, this.state.screen.ratio);
    context.clearRect(0, 0, this.state.screen.width, this.state.screen.height);
    updateObjects(this);
    Scoreboard.update(this);
    this.manageIntervals();
    context.restore();
    if(!this.state.paused) {this.animation = requestAnimationFrame(() => {this.updateGame();});}
  }

  pauseGame(){
    togglePause(this, this.pipeIntervals());
  }

  endGame(){
    this.setState({inGame: false});
    this.state.partySquare.splice(0, 1);
    Scoreboard.updateTopScore(this);
  }

  pipeIntervals(){
    return function(){
      ObjectCreator.createPartyPipe(this.state);
      ObjectCreator.createPipeEntry(this.state);
    }.bind(this);
  }

  manageIntervals() {
    if(this.state.currentLevel === this.state.nextLevel){
      new LevelManager().manageIntervals(this.pipeIntervals(), this.state);
    }
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
