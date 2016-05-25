import { colorsSample, getRandomInt } from '../_helpers';
import ColorManager from '../ColorManager';

export function levelFour(state){
  if(state.colorManager.level !== 4){
    state.colorManager = new ColorManager('moma', 4);
    document.body.className='moma'
  }

  return {
    pipe: {
      height: state.screen.height,
      width: getRandomInt(state.screen.width/125, state.screen.width/12),
      x: state.screen.width,
      y: 0,
      color: state.colorManager.colorSample(),
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
