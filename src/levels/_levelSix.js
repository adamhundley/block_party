import { colorsSample, getRandomInt } from '../_helpers';
import ColorManager from '../ColorManager';

export function levelSix(state){
  if(state.colorManager.level !== 6){
    state.colorManager = new ColorManager('tron', 6);
    document.body.className='tron';
  }

  return {
    pipe: {
      height: state.screen.height,
      width: state.screen.width/80,
      x: state.screen.width,
      y: 0,
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
    }
  };
}
