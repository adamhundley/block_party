export default class PartyPipe {
  constructor(attributes) {
    this.height = attributes.pipe.height;
    this.width = attributes.pipe.width;
    this.x = attributes.pipe.x;
    this.y = attributes.pipe.y;
    this.color = attributes.pipe.color;
    this.speed = attributes.pipe.speed;
  }

  render(state){
    state.context.fillStyle = this.color;
    state.context.fillRect(this.x -= this.speed, this.y, this.width, this.height);
  }
}
