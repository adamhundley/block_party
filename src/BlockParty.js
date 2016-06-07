import { firebaseDB } from './firebase';
import React, { Component } from 'react';
import { GameRecap } from './components/GameRecap';
import { GameInfo } from './components/GameInfo';
import { ColorBoxes } from './components/ColorBoxes';
import EventHandler from './EventHandler';
import * as ObjectCreator from './ObjectCreator';
import * as ObjectUpdater from './ObjectUpdater';
import * as Scoreboard from './Scoreboard';
import * as GamePauser from './GamePauser';
import LevelManager from './LevelManager';

export class BlockParty extends Component {
  constructor(){
    super();
    this.state = {
      partySquare: [],
      topScore: localStorage.topscore || 0,
      globalTopScore: Scoreboard.globalTopScore(firebaseDB, this),
      mobile: this.isMobile(),
      landscape: this.landscape(),
      screen: {
        width: this.width(),
        height: window.innerHeight,
        ratio: window.devicePixelRatio || 1,
        orientation: window.orientation,
      }
    };
  }

  width() {
    if(this.isMobile()) {
      return window.innerWidth - (window.innerHeight / 4)
    } else {
      return window.innerWidth
    }
  }
  
  isMobile() {
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      return true;
    } else {
      return false
    }
  }

  landscape() {
    if(window.orientation === 0) {
      return false
    } else {
      return true
    }
  }

  componentDidMount() {
    new EventHandler(this);
    this.setState({context: this.refs.canvas.getContext('2d')});
    this.startGame();
    if(!this.state.paused){
      requestAnimationFrame(() => {this.updateGame();});
    }
  }

  startGame() {
    if(!this.state.landscape && this.state.mobile) {
      this.setState({
        paused: true,
      })
    } else {
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
    if(!this.state.paused) {this.animation = requestAnimationFrame(() => {this.updateGame();});}
  }

  pauseGame(){
    GamePauser.action(this, this.pipeIntervals());
  }

  endGame(){
    this.setState({inGame: false});
    this.state.partySquare.splice(0, 1);
    Scoreboard.updateTopScore(this, firebaseDB);
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
        <ColorBoxes game={this.state} />
        <GameRecap game={this.state} />
        <GameInfo game={this.state} />
        <canvas ref="canvas"
          width={this.state.screen.width * this.state.screen.ratio}
          height={this.state.screen.height * this.state.screen.ratio}
        />
      </div>
    );
  }
}
