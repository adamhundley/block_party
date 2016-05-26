import { getRandomInt } from '../_helpers';
import ColorManager from '../ColorManager';

export function levelOne(state){
  if(!state.colorManager || state.colorManager.level !== 1){
    state.colorManager = new ColorManager('default', 1);
    document.body.className='default';
  }

  return {
    pipe: {
      height: state.screen.height,
      width: getRandomInt(state.screen.width/200, state.screen.width/12),
      x: state.screen.width,
      y: 0,
      color: state.colorManager.colorSample(),
      speed: 7.5,
      rate: 3500
    },
    entry: {
      inMotion: false,
      minHeight: 2,
      maxHeight: 0.75
    }
  };
}
