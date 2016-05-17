export default class PartyPipe {
  constructor(args) {
    this.height = args.state.screen.height;
    this.width = 100;
    this.startX = args.state.screen.width;
    this.startY = 0;
  }

  render(state){
    state.context.fillRect(this.startX--, this.startY, this.width, this.height);
  }
}
