export default class PartyPipe {
  constructor(attributes) {
    this.maxWidth = attributes.pipe.maxWidth;
    this.height = attributes.pipe.height;
    this.width = attributes.pipe.width;
    this.x = attributes.pipe.x;
    this.y = attributes.pipe.y;
    this.color = attributes.pipe.color;
    this.speed = attributes.pipe.speed;
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
