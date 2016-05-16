export default class PartySquare {
  constructor(args){
    this.x = args.x;
    this.y = args.y;
    this.create = args.create;
    this.gravity = true;
  }

  active(state){
    if(this.gravity) {
      this.gravityMovement(state, this.y++);
    } else {
      this.gravityMovement(state, this.y--);
    }
  }

  render(state){
    state.context.fillRect(this.x, this.y, 100, 100);
    this.active(state);
  }

  gravityMovement(state, direction){
    state.context.clearRect(0, 0, state.screen.width, state.screen.height);
    state.context.fillRect(this.x, direction, 100, 100);
  }

}
