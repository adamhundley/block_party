import { colorsSample, colorCollection } from './helpers';

export default class PartySquare {
  constructor(args){
    this.x = args.x;
    this.y = args.y;
    this.height = args.y/12;
    this.width = this.height;
    this.gravity = true;
    this.initialVelocity = 5;
    this.acceleration = 1.5;
    this.jetAcceleration = 1.004;
    this.velocity = 5;
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
    if(this.atLowerBound(state.screen)){
      this.gravity = false;
    } else if (this.atUpperBound()) {
      this.gravity = true;
    }
    this.resetVelocity();
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
  }

  atVerticalLimit(screen) {
    return this.atUpperBound() || this.atLowerBound();
  }

  atUpperBound() {
    return this.y < 0;
  }

  atLowerBound(screen) {
    return this.y > screen.height - this.height;
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
    this.toggleGravity();
    if(key === 38 && this.gravity){
      this.y -= (this.velocity *= this.jetAcceleration);
    } else if  (key === 40 && !this.gravity) {
      this.y += (this.velocity *= this.jetAcceleration);
    }
    setTimeout(this.resetVelocity.bind(this), 200);
    setTimeout(this.toggleGravity.bind(this), 200);
  }
}
