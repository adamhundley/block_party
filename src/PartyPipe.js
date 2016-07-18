import { colorSample } from './_helpers';

export default class PartyPipe {
  constructor(attributes) {
    this.height = attributes.pipe.height;
    this.width = attributes.pipe.width;
    this.x = attributes.pipe.x;
    this.y = 0;
    this.color = colorSample(attributes.colors);
    this.speed = attributes.pipe.speed;
  }

  render(state){
    state.context.fillStyle = this.color;
    state.context.fillRect(this.x -= this.speed, this.y, this.width, this.height);
  }
}
