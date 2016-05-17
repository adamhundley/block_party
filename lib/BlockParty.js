import React, { Component } from 'react';
import PartySquare from './PartySquare';
import PartyPipe from './PartyPipe';

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
  }

  handleResize(object, e) {
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
    window.addEventListener('resize',  this.handleResize.bind(this, false));

    const context = this.refs.canvas.getContext('2d');
    this.setState({ context: context });
    this.startGame();
    requestAnimationFrame(() => {this.update()});
  }

  update() {
    const context = this.state.context;
    const partySquare = this.partySquare[0]

    context.save();
    context.scale(this.state.screen.ratio, this.state.screen.ratio);
    context.clearRect(0, 0, this.state.screen.width, this.state.screen.height);
    this.updateObjects(this.partySquare, 'partySquare')
    this.updateObjects(this.partyPipes, 'partyPipes');

    context.restore();
    // Next frame
    requestAnimationFrame(() => {this.update()});
  }

  createPartyPipe(state){
    let partyPipe = new PartyPipe({
      create: this.createObject.bind(this),
      state: state
    });
    this.createObject(partyPipe, 'partyPipes')
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

  startGame(){
    this.setState({
      inGame: true
    });

    let partySquare = new PartySquare({
      x: this.state.screen.width/2,
      y: this.state.screen.height/2,
      create: this.createObject.bind(this)
    });
    this.createObject(partySquare, 'partySquare')
    const scope = this;

    setInterval(function(){
      scope.createPartyPipe(scope.state);

    }, 5000);
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
