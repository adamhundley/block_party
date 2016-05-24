import { colorsSample, getRandomInt } from '../_helpers';

export function levelFour(state){
  return {
    pipe: {
      height: state.screen.height,
      width: getRandomInt(state.screen.width/125, state.screen.width/12),
      x: state.screen.width,
      y: 0,
      color: colorsSample(),
      speed: 7,
      rate: 2900
    },
    entry: {
      inMotion: true,
      gravity: Math.random() >= 0.5,
      velocity: 1,
      acceleration: 1
    }
  };
}
