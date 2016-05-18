import { colorsSample, colorCollection } from './helpers';

export default class PartySquare {
  constructor(args){
    this.x = args.x;
    this.y = args.y;
    this.height = args.y/12;
    this.width = this.height;
    this.create = args.create;
    this.gravity = true;
    this.defaultVelocity = 7;
    this.velocity = 7;
    this.score = 0;
    this.currentPipe = 0;
    this.color = colorsSample();
    this.onDie = args.onDie;
  }

  destroy(){
    this.delete = true;
    this.onDie();
  }
  respondToUser(key){
    if(key === 38 || key === 40){
      this.manageGravity(key);
    } else if (key === 65) {
      this.color = colorCollection()[0];
    } else if (key === 83) {
      this.color = colorCollection()[1];
    } else if (key === 68) {
      this.color = colorCollection()[2];
    } else if (key === 70) {
      this.color = colorCollection()[3];
    }
  }

  reverseVelocity(){
    this.velocity = this.defaultVelocity;
  };

  manageGravity(key){
    if(key === 38 && this.gravity || key === 40 && !this.gravity ){
      this.velocity = -this.velocity * 0.85;
      setTimeout(this.reverseVelocity.bind(this), 200);
    }
  }

  checkPipeEntry(state, blockParty){
    let entryTop = blockParty.pipeEntries[this.currentPipe].y;
    let entryBottom = blockParty.pipeEntries[this.currentPipe].y + blockParty.pipeEntries[this.currentPipe].height;

    if(this.x + this.width > blockParty.partyPipes[this.currentPipe].x && this.x < blockParty.partyPipes[this.currentPipe].x + blockParty.partyPipes[this.currentPipe].width ){
      if(this.y > entryTop && this.y + this.height < entryBottom && this.color === blockParty.pipeEntries[this.currentPipe].color){
        this.score++;
        console.log(this.score);
      } else {
        // state.inGame = false;
        this.destroy();
      }
      this.currentPipe++;
      console.log(this.currentPipe);
    }
  }

  active(state){
    if(this.gravity) {
      this.gravityMovement(state, this.y += this.velocity);
    } else {
      this.gravityMovement(state, this.y -= this.velocity);
    }
  }

  render(state, blockParty){
    if(this.y > state.screen.height - this.height){
      if(!this.gravity) {this.velocity = this.defaultVelocity;}
      this.gravity = false;
      this.active(state);
    } else if (this.y < 0) {
      if(this.gravity) {this.velocity = this.defaultVelocity;}

      this.gravity = true;
      this.active(state);
    } else {
      this.active(state);
    }
    if(blockParty.partyPipes.length > 0){
      this.checkPipeEntry(state, blockParty);
    }
  }

  gravityMovement(state, newY){
    state.context.fillStyle = this.color;
    state.context.fillRect(this.x, newY, this.width, this.height);
  }
}
