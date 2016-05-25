import React, { Component } from 'react';
export default class View extends Component {
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
          <button className="startgame">
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
