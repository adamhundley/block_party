import { colorsSample, getRandomInt } from './_helpers';

export default class PartyPipe {
  constructor(args) {
    this.maxWidth = args.state.screen.width/12;
    this.height = args.state.screen.height;
    this.width = getRandomInt(10, this.maxWidth);
    this.x = args.state.screen.width;
    this.y = 0;
    this.color = colorsSample();
    this.speed = 6;
  }

  render(state, blockParty){
    state.context.fillStyle = this.color;
    state.context.fillRect(this.x -= this.speed, this.y, this.width, this.height);
    this.passPartySquare(blockParty);
  }

  passPartySquare(blockParty){
    if(blockParty.inGame){
      let partySquare = blockParty.partySquare[0];
      if(this.x + this.width < partySquare.x) {this.color = '#2c3e50';}
    }
  }
}
