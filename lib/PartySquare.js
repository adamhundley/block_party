export default class PartySquare {
  constructor(){
    this.x = 50;
    this.y = 50;
    this.speed = 0.15;
    debugger
  }
  render(state){
    const context = state.context;
    context.fillRect(this.x, this.y, 10, 10);
  }

  
}
