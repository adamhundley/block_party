import { colorCollection } from './_helpers';

export function  changeSquareColor(key, state, square){
  state.currentScore += 1;
  if (key === 65) {
    square.color = colorCollection()[0];
  } else if (key === 83) {
    square.color = colorCollection()[1];
  } else if (key === 68) {
    square.color = colorCollection()[2];
  } else if (key === 70) {
    square.color = colorCollection()[3];
  }
}
