import { colorSample, getRandomInt } from '../_helpers';

export function levelFour(state){
  let colors = ['lime', 'lime', 'lime', 'lime'];

  document.body.className='retro';

  state.colors = colors;

  return {
    pipe: {
      height: state.screen.height,
      width: state.screen.width/100,
      x: state.screen.width,
      color: 'black',
      speed: 10,
      rate: 1500
    },
    entry: {
      inMotion: true,
      gravity: Math.random() >= 0.5,
      velocity: 6,
      acceleration: 1,
      maxHeight: 0.5,
      minHeight: 2
    },
    colors: colors
  };
}
