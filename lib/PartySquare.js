export default class PartySquare {
  constructor(args){
    this.x = args.x;
    this.y = args.y;
    this.create = args.create;
  }

  render(state){
    const context = state.context;
    context.fillRect(this.x, this.y, 10, 10);
  }
}
