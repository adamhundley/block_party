import { colorsSample, getRandomInt } from '../_helpers';
import ColorManager from '../ColorManager';

export function levelThree(state){
  if(state.colorManager.level !== 3){
    state.colorManager = new ColorManager('moma', 3);
    document.body.className='moma';
  }

  return {
    pipe: {
      height: state.screen.height,
      width: getRandomInt(state.screen.width/75, state.screen.width/8),
      x: state.screen.width,
      y: 0,
      color: state.colorManager.colorSample(),
      speed: 7,
      rate: 3000
    },
    entry: {
      inMotion: true,
      gravity: Math.random() >= 0.5,
      velocity: 0.5,
      acceleration: 1,
      minHeight: 2,
      maxHeight: 0.75
    }
  };
}
