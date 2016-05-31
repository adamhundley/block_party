import React, { Component } from 'react';

export function GameRecap({ game }) {
  let message;
  let endgame;
  let first;
  let second;
  let third;
  let fourth;
  let fifth;

  if(!game.inGame) {
    if(game.currentScore >= parseInt(game.topScore)){
      message = `WOW! NEW TOP SCORE! ${game.currentScore}`;
    } else if (game.currentScore > game.globalTopScore.fifth.score) {
    } else if(game.currentScore < game.globalTopScore){
      message = `Score: ${game.currentScore}`;
      first = `${game.globalScoreBoard.first.name}:
      ${game.globalScoreBoard.first.score}`;
      second = `${game.globalScoreBoard.second.name}:
      ${game.globalScoreBoard.second.score}`;
      third = `${game.globalScoreBoard.third.name}:
      ${game.globalScoreBoard.third.score}`;
      fourth = `${game.globalScoreBoard.fourth.name}:
      ${game.globalScoreBoard.fourth.score}`;
      fifth = `${game.globalScoreBoard.fifth.name}:
      ${game.globalScoreBoard.fifth.score}`;
    }

    endgame = (
      <div className="endgame">
        <h2>Game over.</h2>
        <h1>{message}</h1><br/><br/>
        <h1>{first}</h1>
        <h1>{second}</h1>
        <h1>{third}</h1>
        <h1>{fourth}</h1>
        <h1>{fifth}</h1>

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
