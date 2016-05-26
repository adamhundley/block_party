import React, { Component } from 'react';

export function GameRecap({ game }) {
  let message;
  let endgame;

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
