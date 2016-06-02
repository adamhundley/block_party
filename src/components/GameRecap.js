import React, { Component } from 'react';

export function GameRecap({ game }) {
  let message;
  let information;

  if(!game.inGame && !game.landscape && game.mobile){
    information = (
      <div className="endgame">
        <h1>Welcome to BlocParty</h1>
        <h3>Please Rotate your phone to start the game!</h3>
        <img className="rotate" src={"http://www.solec.org/wp-content/uploads/2015/02/icon-horizontal.png"}></img>
      </div>
    );
  }

  if(game.inGame && game.paused && game.mobile) {
    information = (
      <div className="endgame">
        <h1>Game Paused</h1>
        <h1>Rotate phone to play</h1>
        <img className="rotate" src={"http://www.solec.org/wp-content/uploads/2015/02/icon-horizontal.png"}></img>
      </div>
    );
  }

  if(!game.inGame && game.landscape) {
    if(game.currentScore >= parseInt(game.topScore)){
      message = `WOW! NEW TOP SCORE! ${game.currentScore}`;
    } else {
      message = `Score: ${game.currentScore}`;
    }

    information = (
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
      {information}
    </div>
  );
}
