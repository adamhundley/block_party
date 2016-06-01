import React, { Component } from 'react';

export function GameRecap({ game }) {
  let message;
  let endgame;

  if(game.paused && game.mobile) {
    endgame = (
      <div className="endgame">
        <h1>Game Paused</h1>
        <h1>Rotate phone to landscape to play</h1>
      </div>
    );
  }

  if(!game.inGame) {
    if(game.currentScore >= parseInt(game.topScore)){
      message = `WOW! NEW TOP SCORE! ${game.currentScore}`;
    } else {
      message = `Score: ${game.currentScore}`;
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
    <div className='gameRecap'>
      {endgame}
    </div>
  );
}
