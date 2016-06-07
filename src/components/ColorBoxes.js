import React, { Component } from 'react';
import ColorManager from '../ColorManager';

export function ColorBoxes({ game }) {

  function height() {
    return game.screen.height / 4
  }

  function width() {
    return game.screen.height / 4
  }

  function colors(game) {
    if(!game.currentLevel || game.currentLevel <= 2) {
      return ['#0033FF', '#00FFFF', '#FF00FF', '#9D00FF'];
    } else if (game.currentLevel === 3 || game.currentLevel === 5 ) {
      return ['orange', 'yellow', 'lime', 'red'];
    } else if (game.currentLevel === 4) {
      return ['lime', 'lime', 'lime', 'lime'];
    } else if (game.currentLevel === 6) {
      return ['#ff0099', '#83f52c', '#18CAE6', '#f3f315'];
    }
  }

  let colorBox1 = {
    width: width(),
    height: height(),
    background: colors(game)[0],
  }

  let colorBox2 = {
    width: width(),
    height: height(),
    background: colors(game)[1],
  }

  let colorBox3 = {
    width: width(),
    height: height(),
    background: colors(game)[2],
  }

  let colorBox4 = {
    width: width(),
    height: height(),
    background: colors(game)[3],
  }

  let boxes;

  if(game.mobile) {
    boxes = (
      <div className='colorBoxes'>
        <div id='colorBox1' style={colorBox1}></div>
        <div id='colorBox2' style={colorBox2}></div>
        <div id='colorBox3' style={colorBox3}></div>
        <div id='colorBox4' style={colorBox4}></div>
      </div>
    );
  }

  return (
    <div>
      {boxes}
    </div>
  );
}
