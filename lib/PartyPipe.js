import { colorsSample, getRandomInt } from './helpers';

export default class PartyPipe {
  constructor(args) {
    this.maxWidth = 100;
    this.height = args.state.screen.height;
    this.width = getRandomInt(10, this.maxWidth);
    this.startX = args.state.screen.width;
    this.startY = 0;
    this.color = colorsSample();
    this.speed = 4;
  }

  render(state){
    state.context.fillStyle = this.color;
    state.context.fillRect(this.startX -= this.speed, this.startY, this.width, this.height);
  }
}
