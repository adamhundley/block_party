import { colorSample, getRandomInt } from '../_helpers';

export function levelTwo(state){
  let colors = ['#0033FF', '#00FFFF', '#FF00FF', '#9D00FF'];

  state.colors = colors;

  return {
    pipe: {
      height: state.screen.height,
      width: getRandomInt(state.screen.width/125, state.screen.width/12),
      x: state.screen.width,
      color: colorSample(colors),
      speed: 7.5,
      rate: 2300
    },
    entry: {
      inMotion: true,
      gravity: Math.random() >= 0.5,
      velocity: 2,
      acceleration: 1,
      minHeight: 2,
      maxHeight: 0.75
    },
    colors: colors
  };
}
