import { colorsSample, colorCollection } from './_helpers';
import PipeCleaner from './PipeCleaner';
import * as motion from './_partySquareMotion';
import * as colorManager from './_colorManager';

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
    this.currentPipeIndex = 0;
    this.color = colorsSample();
    this.onDie = args.onDie;
  }

  render(state, blockParty) {
    this.move(state);
    if(blockParty.partyPipes.length > 0) {
      this.checkPipeEntry(blockParty);
    }
  }

  move(state){
    motion.managePerimeterCollision(state, this)
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
    this.onDie();
  }

  respondToUser(key, state){
    if(key === 38 || key === 40){
      motion.jetPack(key, this);
    } else if(colorCollection().indexOf(key) != 0){
      colorManager.changeSquareColor(key, state, this);
    }
  }

  checkPipeEntry(blockParty){
    let currentPipe = blockParty.pipeEntries[this.currentPipeIndex];
    let pipeCleaner = new PipeCleaner(currentPipe);
    if(this.insidePipe(pipeCleaner)){this.travelThroughPipe(pipeCleaner)}
    this.exitPipe(pipeCleaner);
  }

  insidePipe(pipeCleaner) {
    return this.x + this.width > pipeCleaner.entranceX && this.x < pipeCleaner.exitX
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
