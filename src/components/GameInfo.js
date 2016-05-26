import React, { Component } from 'react';

export function GameInfo({ game }) {
  const currentScore = (
    <span className="score current-score" >Score: {game.currentScore}</span>
  );

  const topScore = (
    <span className="score top-score" >My Top Score: {game.topScore} // Global Top Score: {game.globalTopScore}</span>
  );

  const controls = (
    <span className="controls fade-out" >
      Use [←][↑][↓][→] to MOVE<br/>
      Use [A][S][D][F] to CHANGE COLORS
    </span>
  );

  return (
    <div className='gameInfo'>
      {currentScore}
      {topScore}
      {controls}
    </div>
  );
}
