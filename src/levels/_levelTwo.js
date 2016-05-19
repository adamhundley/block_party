import { colorsSample, getRandomInt } from '../_helpers';

export function attributes(state, object, scope){
  if(object === 'PartyPipe'){
    return scope.createPartyPipe(this.levelOnePartyPipe(state));
  }
}

export function levelOnePartyPipe(state){
  return {
    maxWidth: state.screen.width/12,
    height: state.screen.height,
    width: getRandomInt(10, state.screen.width/12),
    x: state.screen.width,
    y: 0,
    color: colorsSample(),
    speed: 8
  };
}
