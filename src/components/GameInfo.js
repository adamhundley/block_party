import React, { Component } from 'react';

export function GameInfo({ game }) {
  const currentScore = (
    <span className="score current-score" >Score: {game.currentScore}</span>
  );

  const topScore = (
    <div>
      <span className="score top-score global">Global Top Score: {game.globalTopScore}</span>
      <span className="score top-score local" >My Top Score: {game.topScore}</span><br/>
    </div>
  );

  const controls = (
    <span className="controls" >
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
