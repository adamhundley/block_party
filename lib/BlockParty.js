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
      }
    };
    this.partySquare =[];
  }

  createObject(object, type){
    this[type].push(object);
  }

  startGame(){
    let partySquare = new PartySquare();
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
