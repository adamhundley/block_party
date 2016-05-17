export default class PartySquare {
  constructor(args){
    this.x = args.x;
    this.y = args.y;
    this.width = 25;
    this.height = 25;
    this.create = args.create;
    this.gravity = true;
  }

  respondToUser(key){
    if(key === 38 || key === 40){
      this.manageGravity(key) ;
    }
  }

  manageGravity(key){
    if(key === 38 && this.gravity ){
      this.gravity = !this.gravity;
    } else if (key === 40 && !this.gravity) {
      this.gravity = !this.gravity;
    }
  }

  active(state){
    if(this.gravity) {
      this.gravityMovement(state, this.y += 10);
    } else {
      this.gravityMovement(state, this.y -= 10);
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

  gravityMovement(state, newY){
    state.context.fillStyle = "#000000";
    state.context.fillRect(this.x, newY, this.width, this.height);
  }
}
