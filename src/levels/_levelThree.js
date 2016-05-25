import { colorsSample, getRandomInt } from '../_helpers';
import ColorManager from '../ColorManager';

export function levelThree(state){
  if(state.colorManager.level !== 3){
    state.colorManager = new ColorManager('retro', 3);
    document.body.className='retro';
  }

  return {
    pipe: {
      height: state.screen.height,
      width: getRandomInt(state.screen.width/125, state.screen.width/12),
      x: state.screen.width,
      y: 0,
      color: 'black',
      speed: 9,
      rate: 1000
    },
    entry: {
      inMotion: true,
      gravity: Math.random() >= 0.5,
      velocity: 3,
      acceleration: 1
    }
  };
}
