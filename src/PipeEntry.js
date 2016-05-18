import { colorsSample, getRandomInt } from './helpers';

export default class PipeEntry {
  constructor(args) {
    this.partyPipe = args.partyPipe;
    this.maxHeight = 200;
    this.height = getRandomInt(200, this.maxHeight);
    this.width = this.partyPipe.width;
    this.x = args.state.screen.width;
    this.y = getRandomInt(100, 100);
    this.color = colorsSample(this.partyPipe.color);
    this.speed = this.partyPipe.speed;
  }

  destroy(blockParty){
    if(this.x < 0 - this.width) {
      blockParty.pipeEntries.shift();
      blockParty.pipeEntries[0].x = blockParty.pipeEntries[0].x - 4;
    }
  }

  render(state, blockParty){
    state.context.fillStyle = this.color;
    state.context.fillRect(this.x -= this.speed, this.y, this.width, this.height);
    // this.destroy(blockParty);
  }
}
