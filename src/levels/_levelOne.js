import { colorsSample, getRandomInt } from '../_helpers';

export function levelOne(state){
  return {
    pipe: {
      height: state.screen.height,
      width: getRandomInt(state.screen.width/200, state.screen.width/12),
      x: state.screen.width,
      y: 0,
      color: colorsSample(),
      speed: 5.5,
      rate: 3200
    }
  };
}
