import React, { Component } from 'react';

export function GameInfo({ game }) {
  const currentScore = (
    <span className="score current-score" >Score: {game.currentScore}</span>
  );

  const topScore = (
    <div>
      <p className="score top-score global">Global Top Score: {game.globalTopScore}</p>
      <p className="score top-score local" >My Top Score: {game.topScore}</p><br/>
    </div>
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
