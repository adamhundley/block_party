import { colorsSample, getRandomInt } from './helpers';

export default class PipeEntry {
  constructor(args) {
    this.partyPipe = args.partyPipe;
    this.maxHeight = 400;
    this.height = getRandomInt(100, this.maxHeight);
    this.width = this.partyPipe.width;
    this.x = args.state.screen.width;
    this.y = getRandomInt(0, args.state.screen.height - 100);
    this.color = colorsSample(this.partyPipe.color);
    this.speed = this.partyPipe.speed;
  }

  destroy(){
    if(this.x < 0 - this.width) {
      let partyPipesCollection = window.$r.partyPipes;
      let pipeEntriesCollection = window.$r.pipeEntries;
      partyPipesCollection.shift();
      pipeEntriesCollection.shift();
    }
  }

  render(state){
    state.context.fillStyle = this.color;
    state.context.fillRect(this.x -= this.speed, this.y, this.width, this.height);
    this.destroy();
  }
}
