import { colorsSample, getRandomInt } from './helpers';

export default class PipeEntry {
  constructor(args) {
    this.maxHeight = 400;
    this.height = getRandomInt(100, this.maxHeight);
    this.width = args.partyPipe.width;
    this.startX = args.state.screen.width;
    this.startY = getRandomInt(0, args.state.screen.height - 100);
    this.color = colorsSample(args.partyPipe.color);
    this.speed = args.partyPipe.speed;
  }

  render(state){
    state.context.fillStyle = this.color;
    state.context.fillRect(this.startX -= this.speed, this.startY, this.width, this.height);
  }
}
