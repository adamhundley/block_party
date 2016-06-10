import React, { Component } from 'react';
import * as Scoreboard from '../Scoreboard';
import { firebaseDB } from '../firebase';

export function NewTopScore({ game }) {
  let message;

  function updateName(e) {
      let name = document.getElementById("nameInput").value
    Scoreboard.updateGlobalScoreboard(game, firebaseDB, name)
    game.startGame();
  }

  if(!game.state.inGame && game.state.newTopScore) {
    message = (
      <div className="endgame">
        <h1>WOW! New Top Score</h1><br/>
        <form id="nameForm" onSubmit={updateName}>
          <input id="nameInput" type="text" name="name" placeholder="Enter Your Name" maxLength="25"></input><br/>
          <input className="submit" type="submit"></input>
          <br/><br/>
          <button className="playagain">
            play again
          </button>
        </form>
          <br/><br/>
      </div>
    );
  }

  return (
    <div className='gameRecap'>
      {message}
    </div>
  );
}
