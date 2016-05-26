import { colorsSample, getRandomInt } from '../_helpers';
import ColorManager from '../ColorManager';

export function levelFour(state){
  if(state.colorManager.level !== 4){
    state.colorManager = new ColorManager('retro', 4);
    document.body.className='retro'
  }

  return {
    pipe: {
      height: state.screen.height,
      width: state.screen.width/100,
      x: state.screen.width,
      y: 0,
      color: 'black',
      speed: 10,
      rate: 1500
    },
    entry: {
      inMotion: true,
      gravity: Math.random() >= 0.5,
      velocity: 6,
      acceleration: 1,
      maxHeight: .5,
      minHeight: 2
    }
  };
}
