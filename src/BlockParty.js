import React, { Component } from 'react';
import PartySquare from './PartySquare';
import PartyPipe from './PartyPipe';
import PipeEntry from './PipeEntry';

export class BlockParty extends Component {
  constructor(){
    super();
    this.state = {
      screen: {
        width: window.innerWidth,
        height: window.innerHeight,
        ratio: window.devicePixelRatio || 1,
      },
      context: null,
      inGame: false,
      currentScore: 0
    };
    this.partySquare =[];
    this.partyPipes = [];
    this.pipeEntries = [];
    this.pipeCount = 0;
  }

  gameOver(){
    this.setState({
      inGame: false
    });
  }

  startGame(){
    this.setState({
      inGame: true
    });

    clearInterval(this.pipeInterval);
    this.partyPipes = [];
    this.pipeEntries = [];
    this.pipeCount = 0;

    let partySquare = new PartySquare({
      x: this.state.screen.width/3,
      y: this.state.screen.height/2,
      create: this.createObject.bind(this),
      onDie: this.gameOver.bind(this)
    });

    this.createObject(partySquare, 'partySquare');

    let pipeIntervals = function(){
      this.createPartyPipe(this.state);
      this.createPipeEntry(this.state, this.partyPipes[this.partyPipes.length -1]);
      this.pipeCount += 1;
    }.bind(this);

    this.pipeInterval = setInterval(function(){pipeIntervals();}, 2000);
  }

  addScore(points){
    this.currentScore += points;
  }

  update() {
    const context = this.state.context;
    context.save();
    context.scale(this.state.screen.ratio, this.state.screen.ratio);
    context.clearRect(0, 0, this.state.screen.width, this.state.screen.height);

    this.updateObjects(this.partyPipes, 'partyPipes');
    this.updateObjects(this.pipeEntries, 'pipeEntries');
    this.updateObjects(this.partySquare, 'partySquare');
    this.addScore(this.partySquare.score);
    context.restore();

    // Next frame
    requestAnimationFrame(() => {this.update();});
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

  handleKeys(value, e){
    this.partySquare[0].respondToUser(e.keyCode);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeys.bind(this, true));
    window.addEventListener('resize',  this.handleResize.bind(this));

    const context = this.refs.canvas.getContext('2d');
    this.setState({ context: context });
    this.startGame();
    requestAnimationFrame(() => {this.update();});
  }

  createPartyPipe(state){
    let partyPipe = new PartyPipe({
      create: this.createObject.bind(this),
      state: state
    });
    this.createObject(partyPipe, 'partyPipes');
  }

  createPipeEntry(state, partyPipe){
    let pipeEntry = new PipeEntry({
      create: this.createObject.bind(this),
      state: state,
      partyPipe: partyPipe
    });
    this.createObject(pipeEntry, 'pipeEntries');
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

  createObject(object, type){
    this[type].push(object);
  }


  render() {
    let endgame;

    if(!this.state.inGame){
      endgame = (
        <div className="endgame">
          <p>Game over, bro!  </p>
          <button
            onClick={ this.startGame.bind(this) }>
            try again?
          </button>
        </div>
      )
    }
    return (
      <div>
        { endgame }
      <span className="score current-score" >Score: {this.state.currentScore}</span>
      <span className="score top-score" >Top Score: {this.state.topScore}</span>
      <span className="controls" >
        Use [A][S][W][D] or [←][↑][↓][→] to MOVE<br/>
        Use [SPACE] to SHOOT
      </span>
        <canvas ref="canvas"
          width={this.state.screen.width * this.state.screen.ratio}
          height={this.state.screen.height * this.state.screen.ratio}
        />
      </div>
    );
  }
}
