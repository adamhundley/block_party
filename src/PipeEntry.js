import { colorsSample, getRandomInt } from './_helpers';

export default class PipeEntry {
  constructor(args) {
    this.margin = 65;
    this.partyPipe = args.partyPipe;
    this.maxHeight = args.state.screen.height*.75;
    this.minHeight = args.state.screen.height/4;
    this.height = getRandomInt(this.minHeight, this.maxHeight);
    this.x = args.state.screen.width;
    this.y = getRandomInt(this.margin, args.state.screen.height - (this.margin + this.height));
    this.width = this.partyPipe.width;
    this.color = colorsSample(this.partyPipe.color);
    this.speed = this.partyPipe.speed;
  }

  render(state){
    state.context.fillStyle = this.color;
    state.context.fillRect(this.x -= this.speed, this.y, this.width, this.height);
  }
}
