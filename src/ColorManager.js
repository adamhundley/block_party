export default class ColorManager{
  constructor(theme, level){
    this.theme = this[theme]();
    this.level = level;
  }

  changeSquareColor(state, square, key){
    state.currentScore += 1;
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

  toggleSquareColor(state, square) {
    state.currentScore += 1;

    let newColorIndex = this.theme.indexOf(square.color) + 1
    square.color = this.theme[newColorIndex % 4]
  }

  colorSample(rejectColor) {
    let set = [0, 1, 2, 3]

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
    return ['lime', 'lime', 'lime', 'lime']
  }

}
