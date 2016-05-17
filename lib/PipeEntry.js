import { colorsSample, getRandomInt } from './helpers';

export default class PipeEntry {
  constructor(args) {
    this.height = 100;
    this.width = 100;
    this.startX = args.state.screen.width;
    this.startY = getRandomInt(0, args.state.screen.height - 100);
  }

  render(state){
    state.context.fillStyle = colorsSample();
    state.context.fillRect(this.startX--, this.startY, this.width, this.height);
  }
}
