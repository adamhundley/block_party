import { colorSample, getRandomInt } from '../_helpers';

export function levelFive(state){
  let colors = ['orange', 'yellow', 'lime', 'red'];

  document.body.className='moma';

  state.colors = colors;

  return {
    pipe: {
      height: state.screen.height,
      width: getRandomInt(state.screen.width/10, state.screen.width/5),
      x: state.screen.width,
      color: colorSample(colors),
      speed: 7.5,
      rate: 2000
    },
    entry: {
      inMotion: true,
      gravity: Math.random() >= 0.5,
      velocity: 1,
      acceleration: 1,
      minHeight: 2,
      maxHeight: 0.75
    },
    colors: colors
  };
}
