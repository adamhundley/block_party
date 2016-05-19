
export default class PartyPipe {
  constructor(attributes) {
    this.maxWidth = attributes.maxWidth;
    this.height = attributes.height;
    this.width = attributes.width;
    this.x = attributes.x;
    this.y = attributes.y;
    this.color = attributes.color;
    this.speed = attributes.speed;
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
