import { colorsSample, getRandomInt } from './helpers';

export default class PartyPipe {
  constructor(args) {
    this.maxWidth = 100;
    this.height = args.state.screen.height;
    this.width = getRandomInt(10, this.maxWidth);
    this.x = args.state.screen.width;
    this.y = 0;
    this.color = colorsSample();
    this.speed = 4;
  }

  passPartySquare(blockParty){
    let partySquare = blockParty.partySquare[0];
    if(this.x + this.width < partySquare.x) {
      this.color = '#ffffff'
    }
  }

  render(state, blockParty){
    state.context.fillStyle = this.color;
    state.context.fillRect(this.x -= this.speed, this.y, this.width, this.height);
    this.passPartySquare(blockParty);
  }
}
