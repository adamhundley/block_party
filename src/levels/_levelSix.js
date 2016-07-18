import { colorSample, getRandomInt } from '../_helpers';

export function levelSix(state){
  let colors = ['#ff0099', '#83f52c', '#18CAE6', '#f3f315'];

  document.body.className='tron';

  state.colors = colors;

  return {
    pipe: {
      height: state.screen.height,
      width: state.screen.width/80,
      x: state.screen.width,
      color: 'black',
      speed: 6,
      rate: 1200
    },
    entry: {
      inMotion: true,
      gravity: Math.random() >= 0.5,
      velocity: 5,
      acceleration: 1,
      maxHeight: 0.5,
      minHeight: 2
    },
    colors: colors
  };
}
