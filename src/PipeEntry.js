import { colorsSample, getRandomInt } from './_helpers';
import * as Motion from './Motion';

export default class PipeEntry {
  constructor(state, level) {
    this.margin = 65;
    this.partyPipe = this.currentPartyPipe(state);
    this.maxHeight = state.screen.height * level.entry.maxHeight;
    this.minHeight = state.screen.height / level.entry.minHeight;
    this.height = getRandomInt(this.minHeight, this.maxHeight);
    this.x = state.screen.width;
    this.y = getRandomInt(this.margin, state.screen.height - (this.margin + this.height));
    this.width = this.partyPipe.width;
    this.color = state.colorManager.colorSample(this.partyPipe.color);
    this.speed = this.partyPipe.speed;
    this.inMotion = level.entry.inMotion;
    this.gravity = level.entry.gravity;
    this.velocity = level.entry.velocity;
    this.acceleration = level.entry.acceleration;
  }

  move(state){
    Motion.managePerimeterCollision(state, this);
    Motion.accelerate(state, this);
  }

  render(state){
    if(this.inMotion) {this.move(state);}
    state.context.fillStyle = this.color;
    state.context.fillRect(this.x -= this.speed, this.y, this.width, this.height);
  }

  currentPartyPipe(state){
    return state.partyPipes[state.partyPipes.length -1];
  }
}
