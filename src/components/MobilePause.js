import React, { Component } from 'react';

export function MobilePause({ game }) {
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

  return (
    <div className='gameRecap'>
      {information}
    </div>
  );
}
