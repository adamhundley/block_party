export default class PartyPipe {
  constructor(attributes) {
    this.height = attributes.pipe.height;
    this.width = attributes.pipe.width;
    this.x = attributes.pipe.x;
    this.y = attributes.pipe.y;
    this.color = attributes.pipe.color;
    this.speed = attributes.pipe.speed;
  }

  move() {
    this.x -= this.speed;
  }

  draw(state) {
    state.context.fillStyle = this.color;
    state.context.fillRect(this.x, this.y, this.width, this.height);
  }

  render(state){
    this.move();
    this.draw(state);
  }
}
