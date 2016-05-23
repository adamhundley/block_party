import { colorsSample, getRandomInt } from './_helpers';

export default class PipeEntry {
  constructor(state) {
    this.margin = 65;
    this.partyPipe = this.currentPartyPipe(state);
    this.maxHeight = state.screen.height*.75;
    this.minHeight = state.screen.height/2;
    this.height = getRandomInt(this.minHeight, this.maxHeight);
    this.x = state.screen.width;
    this.y = getRandomInt(this.margin, state.screen.height - (this.margin + this.height));
    this.width = this.partyPipe.width;
    this.color = colorsSample(this.partyPipe.color);
    this.speed = this.partyPipe.speed;
  }

  render(state){
    state.context.fillStyle = this.color;
    state.context.fillRect(this.x -= this.speed, this.y, this.width, this.height);
  }

  currentPartyPipe(state){
    return state.partyPipes[state.partyPipes.length -1]
  }
}
