import { colorsSample, getRandomInt } from '../_helpers';
import ColorManager from '../ColorManager';

export function levelFive(state){
  if(state.colorManager.level !== 5){
    state.colorManager = new ColorManager('moma', 5)
    document.body.className='moma';
  }

  return {
    pipe: {
      height: state.screen.height,
      width: getRandomInt(state.screen.width/10, state.screen.width/5),
      x: state.screen.width,
      y: 0,
      color: state.colorManager.colorSample(),
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
    }
  };
}
