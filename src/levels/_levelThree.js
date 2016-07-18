import { colorSample, getRandomInt } from '../_helpers';

export function levelThree(state){
  let colors = ['orange', 'yellow', 'lime', 'red']

  document.body.className='moma';

  state.colors = colors;

  return {
    pipe: {
      height: state.screen.height,
      width: getRandomInt(state.screen.width/75, state.screen.width/8),
      x: state.screen.width,
      color: colorSample(colors),
      speed: 7,
      rate: 2500
    },
    entry: {
      inMotion: true,
      gravity: Math.random() >= 0.5,
      velocity: 0.5,
      acceleration: 1,
      minHeight: 2,
      maxHeight: 0.75
    },
    colors: colors
  };
}
