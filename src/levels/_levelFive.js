import { colorsSample, getRandomInt } from '../_helpers';
import ColorManager from '../ColorManager';

export function levelFive(state){
  if(state.colorManager.level !== 5){
    state.colorManager = new ColorManager('default', 5)
  }

  return {
    pipe: {
      maxWidth: state.screen.width/12,
      height: state.screen.height,
      width: getRandomInt(10, state.screen.width/12),
      x: state.screen.width,
      y: 0,
      color: state.colorManager.colorSample(),
      speed: 6,
      rate: 1000
    },
    entry: {
      inMotion: false
    }
  };
}
