export default class ColorManager{
  constructor(theme, level){
    this.theme = this[theme]();
    this.level = level;
  }

  changeSquareColor(state, square, key){
    if(state.inGame){state.currentScore += 1}
    if (key === 65) {
      square.color = this.theme[0];
    } else if (key === 83) {
      square.color = this.theme[1];
    } else if (key === 68) {
      square.color = this.theme[2];
    } else if (key === 70) {
      square.color = this.theme[3];
    }
  }

  toggleSquareColor(state, square, y) {
    if(state.inGame){state.currentScore += 1}
    if (y < state.screen.height / 4) {
      square.color = this.theme[0];
    } else if (y > state.screen.height/4 && y < state.screen.height / 2) {
      square.color = this.theme[1];
    } else if (y > state.screen.height/2 && y < state.screen.height / 4 + state.screen.height / 2) {
      square.color = this.theme[2];
    } else if (y > state.screen.height / 4 + state.screen.height / 2) {
      square.color = this.theme[3];
    }

  }

  colorSample(rejectColor) {
    let set = [0, 1, 2, 3];

    if(rejectColor) {
      set.splice(this.theme.indexOf(rejectColor), 1);
    }

    return this.theme[set[Math.floor(Math.random() * set.length)]];
  }

  default(){
    return ['#0033FF', '#00FFFF', '#FF00FF', '#9D00FF'];
  }

  moma(){
    return ['orange', 'yellow', 'lime', 'red'];
  }

  retro(){
    return ['lime', 'lime', 'lime', 'lime'];
  }

  tron(){
    return ['#ff0099', '#83f52c', '#18CAE6', '#f3f315'];
  }
}
