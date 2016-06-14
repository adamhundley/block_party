import React, { Component } from 'react';

export function GameOverScoreboard({ game }) {
  let message;
  let first;
  let second;
  let third;
  let fourth;
  let fifth;
  let information;

  function scoreboard() {
    first = `${game.globalScoreBoard.topScores.first.name}:
    ${game.globalScoreBoard.topScores.first.score}`;
    second = `${game.globalScoreBoard.topScores.second.name}:
    ${game.globalScoreBoard.topScores.second.score}`;
    third = `${game.globalScoreBoard.topScores.third.name}:
    ${game.globalScoreBoard.topScores.third.score}`;
    fourth = `${game.globalScoreBoard.topScores.fourth.name}:
    ${game.globalScoreBoard.topScores.fourth.score}`;
    fifth = `${game.globalScoreBoard.topScores.fifth.name}:
    ${game.globalScoreBoard.topScores.fifth.score}`;
  }

  if(!game.inGame && !game.newTopScore && game.landscape) {
    if(game.currentScore >= parseInt(game.topScore)){
      message = `WOW! You beat your old top score! ${game.currentScore}`;
      scoreboard();
    } else if(game.currentScore < parseInt(game.topScore)){
      message = `Your Score: ${game.currentScore}`;
      scoreboard();
    }

    information = (
      <div className="endgame">
        <h1 className="yourScore">{message}</h1><br/>
        <h1>Top Scoreboard</h1>
        <h2>{first}</h2>
        <h2>{second}</h2>
        <h2>{third}</h2>
        <h2>{fourth}</h2>
        <h2>{fifth}</h2>
        <br/>
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
