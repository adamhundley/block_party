import { getRandomInt, colorSample } from '../_helpers';

export function levelOne(state){
  let colors = ['#0033FF', '#00FFFF', '#FF00FF', '#9D00FF'];

  document.body.className='default';

  state.colors = colors;

  return {
    pipe: {
      height: state.screen.height,
      width: getRandomInt(state.screen.width/200, state.screen.width/12),
      x: state.screen.width,
      color: colorSample(colors),
      speed: 7.5,
      rate: 3500
    },
    entry: {
      inMotion: false,
      minHeight: 2,
      maxHeight: 0.75
    },
    colors: colors
  };
}
