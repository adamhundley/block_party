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
    this.bounceFactor = -10;
    this.velocity = 4;
    this.points = 0;
    this.currentPipe = 0;
    this.color = colorsSample();
    this.onDie = args.onDie;
  }

  render(state, blockParty){
    this.move(state);
    if(blockParty.partyPipes.length > 0){
      this.checkPipeEntry(state, blockParty);
    }
  }

  move(state){
    if(this.atVerticalLimit(state.screen)){
      this.resetVelocity();
      this.toggleGravity();
    }
    this.accelerate(state);
    this.draw(state);
  }

  draw(state){
    state.context.fillStyle = this.color;
    state.context.fillRect(this.x, this.y, this.width, this.height);
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
        this.points++;
      } else {
        this.destroy();
      }
    }

    if(this.x > blockParty.partyPipes[this.currentPipe].x + blockParty.partyPipes[this.currentPipe].width){
        this.currentPipe++;
        this.points = 0;
      }
    }

  respondToUser(key){
    if(key === 38 || key === 40){
      this.jetPack(key);
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
  toggleGravity() {
    this.gravity = !this.gravity;
  }

  resetVelocity(){
    this.velocity = this.initialVelocity;
  };

  atVerticalLimit(screen) {
    return this.atUpperBound() || this.atLowerBound(screen);
  }

  atUpperBound() {
    return this.y < 0;
  }

  atLowerBound(screen) {
    return this.y > screen.height - this.height;;
  }

  accelerate(state) {
    this.gravity ? this.accelerateDown(state) : this.accelerateUp(state)
  }

  accelerateDown(state){
    this.y += this.acceleratedVelocity();
  }

  accelerateUp(state){
    this.y -= this.acceleratedVelocity();
  }

  acceleratedVelocity() {
    return this.velocity *= this.acceleration;
  }

  jetPack(key){
    if(key === 38 && this.gravity || key === 40 && !this.gravity ){
      this.velocity = this.bounceFactor;
      setTimeout(this.resetVelocity.bind(this), 200);
    }
  }
}
