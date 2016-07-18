export function toggleSquareColor(state, square, y) {
  if(state.inGame){state.currentScore += 1}
  if (y < state.screen.height / 4) {
    square.color = state.colors[0];
  } else if (y > state.screen.height/4 && y < state.screen.height / 2) {
    square.color = state.colors[1];
  } else if (y > state.screen.height/2 && y < state.screen.height / 4 + state.screen.height / 2) {
    square.color = state.colors[2];
  } else if (y > state.screen.height / 4 + state.screen.height / 2) {
    square.color = state.colors[3];
  }
}

export function changeSquareColor(state, square, key){
  if(state.inGame){state.currentScore += 1}
  if (key === 65) {
    square.color = state.colors[0];
  } else if (key === 83) {
    square.color = state.colors[1];
  } else if (key === 68) {
    square.color = state.colors[2];
  } else if (key === 70) {
    square.color = state.colors[3];
  }
}
