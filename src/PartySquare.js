import { colorsSample, colorCollection } from './helpers';

export default class PartySquare {
  constructor(args){
    this.x = args.x;
    this.y = args.y;
    this.height = args.y/12;
    this.width = this.height;
    this.create = args.create;
    this.gravity = true;
    this.initialVelocity = 4;
    this.acceleration = 1.01;
    this.bounceFactor = -5;
    this.velocity = 4;
    this.score = 0;
    this.currentPipe = 0;
    this.color = colorsSample();
    this.onDie = args.onDie;
  }

  destroy(){
    this.delete = true;
    this.onDie();
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

  //gravity
  active(state){
    if(this.gravity) {
      this.accelerateDown(state);
    } else {
      this.accelerateUp(state);
    }
  }

  accelerateDown(state){
    this.gravityMovement(state, this.y = this.y + (this.velocity *= this.acceleration));
  }

  accelerateUp(state){
    this.gravityMovement(state, this.y = this.y - (this.velocity *= this.acceleration));
  }

  resetVelocity(){
    this.velocity = this.initialVelocity;
  };

  manageGravity(key){
    if(key === 38 && this.gravity || key === 40 && !this.gravity ){
      this.velocity = this.bounceFactor;
      setTimeout(this.resetVelocity.bind(this), 200);
    }
  }

  gravityMovement(state){
    state.context.fillStyle = this.color;
    state.context.fillRect(this.x, this.y, this.width, this.height);
  }

  //render

  render(state, blockParty){
    if(this.y > state.screen.height - this.height){
      if(this.gravity) {this.velocity = this.initialVelocity;}
      this.gravity = false;
      this.active(state);
    } else if (this.y < 0) {
      if(!this.gravity) {this.velocity = this.initialVelocity;}
      this.gravity = true;
      this.active(state);
    } else {
      this.active(state);
    }
    if(blockParty.partyPipes.length > 0){
      this.checkPipeEntry(state, blockParty);
    }
  }
}
