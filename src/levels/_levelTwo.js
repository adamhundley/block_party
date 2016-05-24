import { colorsSample, getRandomInt } from '../_helpers';
import ColorManager from '../ColorManager';

export function levelTwo(state){
  if(state.colorManager.level !== 2){
    state.colorManager = new ColorManager('default', 2)
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
    }
  };
}
