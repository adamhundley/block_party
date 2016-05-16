import React, { Component } from 'react';
import PartySquare from './PartySquare';

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
  }

  handleResize(object, e) {
    this.setState({
      screen: {
        width: windoe.innerWidth,
        height: window.innerHeight,
        ration: window.devicePixelRatio || 1
      }
    });
  }

  componentDidMount() {
    window.addEventListener('resize',  this.handleResize.bind(this, false));

    const context = this.refs.canvas.getContext('2d');
    this.setState({ context: context });
    this.startGame();
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
  }

  render() {
    return (
      <div>
        <button className="score current-score" onClick={ this.startGame.bind(this)}>Suck it</button>
        <canvas ref="canvas"
          width={this.state.screen.width * this.state.screen.ratio}
          height={this.state.screen.height * this.state.screen.ratio}
        />
      </div>
    );
  }
}
