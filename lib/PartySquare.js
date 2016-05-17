export default class PartySquare {
  constructor(args){
    this.x = args.x;
    this.y = args.y;
    this.height = args.y/12;
    this.width = this.height;
    this.create = args.create;
    this.gravity = true;
    this.defaultVelocity = 5;
    this.velocity = 5;
  }

  respondToUser(key){
    if(key === 38 || key === 40){
      this.manageGravity(key) ;
    }
  }

  reverseVelocity(){
    this.velocity = this.defaultVelocity;
  }

  manageGravity(key){
    if(key === 38 && this.gravity || key === 40 && !this.gravity ){
      this.velocity = -this.velocity * 0.75;
      setTimeout(this.reverseVelocity.bind(this), 200);
    }
  }

  active(state){
    if(this.gravity) {
      this.gravityMovement(state, this.y += this.velocity);
    } else {
      this.gravityMovement(state, this.y -= this.velocity);
    }
  }

  render(state){
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
  }

  gravityMovement(state, newY){
    state.context.fillStyle = "#000000";
    state.context.fillRect(this.x, newY, this.width, this.height);
  }
}
