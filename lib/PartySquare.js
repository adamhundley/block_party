
export default class PartySquare {
  constructor(args){
    this.x = args.x;
    this.y = args.y;
    this.width = 50;
    this.height = 50;
    this.create = args.create;
    this.gravity = true;
  }

  respondToUser(key){
    if(key === 38 || key === 40){
      this.manageGravity(key) ;
    }
  }

  manageGravity(key){
    if(key === 38){
      if(this.gravity){
        this.gravity = !this.gravity;
      }
    } else if (key === 40) {
      if(!this.gravity){
        this.gravity = !this.gravity;
      }
    }
  }

  active(state){
    if(this.gravity) {
      this.gravityMovement(state, this.y += 5);
    } else {
      this.gravityMovement(state, this.y -= 5);
    }
  }

  render(state){
    if(this.y > state.screen.height - this.height){
      this.gravity = false;
      this.active(state);
    } else if (this.y < 0) {
      this.gravity = true;
      this.active(state);
    } else {
      this.active(state);
    }
  }

  gravityMovement(state, direction){
    state.context.clearRect(0, 0, state.screen.width, state.screen.height);
    state.context.fillRect(this.x, direction, this.width, this.height);
  }

}
