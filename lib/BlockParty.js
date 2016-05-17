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
      inGame: false
    };
    this.partySquare =[];
    this.partyPipes = [];
    this.pipeEntries = [];
  }

  startGame(){
    this.setState({
      inGame: true
    });

    let partySquare = new PartySquare({
      x: this.state.screen.width/3,
      y: this.state.screen.height/2,
      create: this.createObject.bind(this)
    });
    this.createObject(partySquare, 'partySquare');
    const scope = this;

    setInterval(function(){
      scope.createPartyPipe(scope.state);
      scope.createPipeEntry(scope.state, scope.partyPipes[scope.partyPipes.length -1]);
    }, 2000);
  }

  update() {
    const context = this.state.context;
    context.save();
    context.scale(this.state.screen.ratio, this.state.screen.ratio);
    context.clearRect(0, 0, this.state.screen.width, this.state.screen.height);
    this.updateObjects(this.partyPipes, 'partyPipes');
    this.updateObjects(this.pipeEntries, 'pipeEntries');
    this.updateObjects(this.partySquare, 'partySquare');
    context.restore();
    if(this.state.inGame === false){
      console.log('Game Over!');
    }
    // Next frame
    requestAnimationFrame(() => {this.update();});
  }

  handleResize(scope) {
    scope.setState({
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
        items[index].render(this.state);
      }
      index++;
    }
  }

  createObject(object, type){
    this[type].push(object);
  }


  render() {
    return (
      <div>
        <canvas ref="canvas"
          width={this.state.screen.width * this.state.screen.ratio}
          height={this.state.screen.height * this.state.screen.ratio}
        />
      </div>
    );
  }
}
