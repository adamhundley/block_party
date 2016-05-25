import ColorManager from './ColorManager';
import PipeCleaner from './PipeCleaner';
import * as motion from './_partyPhysics';

export default class PartySquare {
  constructor(state, level){
    this.x = state.screen.width/3;
    this.y = state.screen.height/2;
    this.height = this.y/12;
    this.width = this.height;
    this.gravity = true;
    this.initialVelocity = this.y/50;
    this.lateralVelocity = 4;
    this.acceleration = 1.5;
    this.jetAcceleration = 1.004;
    this.velocity = this.y/50;
    this.points = 0;
    this.currentPipeIndex = 0;
    this.color = state.colorManager.colorSample();
  }

  render(state) {
    this.move(state);
    if(state.partyPipes.length > 0) {
      this.checkPipeEntry(state);
    }
  }

  move(state){
    motion.managePerimeterCollision(state, this);
    motion.resetVelocity(this);
    motion.accelerate(state, this);
    this.draw(state);
  }

  draw(state){
    state.context.fillStyle = this.color;
    state.context.fillRect(this.x, this.y, this.width, this.height);
  }

  destroy(){
    this.delete = true;
  }

  respondToUser(key, state){
    if(this.verticalMovementKeys(key)){
      motion.jetPack(key, this);
    } else if(this.lateralMovementKeys(key)) {
      motion.lateralJetPack(key, this, state);
    } else if(this.colorChangeKeys(key)){
      state.colorManager.changeSquareColor(key, state, this);
    }
  }

  colorChangeKeys(key){
    return key === 65 || key === 68 || key === 70 || key === 83;
  }

  verticalMovementKeys(key){
    return key === 38 || key === 40;
  }

  lateralMovementKeys(key){
    return key === 37 || key === 39;
  }

  checkPipeEntry(state){
    let currentPipe = state.pipeEntries[this.currentPipeIndex];
    let pipeCleaner = new PipeCleaner(currentPipe);
    if(this.insidePipe(pipeCleaner)){this.travelThroughPipe(pipeCleaner);}
    this.exitPipe(pipeCleaner);
  }

  insidePipe(pipeCleaner) {
    return this.x + this.width > pipeCleaner.entranceX && this.x < pipeCleaner.exitX;
  }

  travelThroughPipe(pipeCleaner) {
    if(this.y > pipeCleaner.entryTop && this.y + this.height < pipeCleaner.entryBottom && this.color === pipeCleaner.pipeColor){
      this.points++;
    } else {
      this.destroy();
    }
  }

  exitPipe(pipeCleaner) {
    if(this.x > pipeCleaner.exitX){
      this.currentPipeIndex++;
      this.points = 0;
    }
  }
}
