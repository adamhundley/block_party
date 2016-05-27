export function mountEventHandler(game) {
  window.addEventListener('keydown', handleKeys.bind(this, game));
  window.addEventListener('resize',  handleResize.bind(this, game));
  window.addEventListener('click',  handleClick.bind(this, game));
  window.addEventListener('touchstart',  handleTouch.bind(this, game));
}

function handleKeys(game, e) {
  if(game.state.inGame){
    game.state.partySquare[0].respondToUser(e.keyCode, game.state);
  }

  if(game.state.inGame && e.keyCode === 32){
    game.pauseGame();
  }

  if(!game.state.inGame && e.keyCode === 13){
    game.startGame();
  }
}

function handleClick(game, e) {
  if(e.toElement.className === "startgame") {
    game.startGame();
  }
}

function handleTouch(game, e) {
  if(game.state.inGame){
    e.preventDefault();
    let touchPoints = e.changedTouches;

    if(touchPoints[touchPoints.length - 1].pageX < game.state.screen.width / 2){
      game.state.partySquare[0].respondToTouch('color', game.state);
    } else if (touchPoints[touchPoints.length - 1].pageX > game.state.screen.width / 2) {
      game.state.partySquare[0].respondToTouch('jetPack', game.state);
    }
  }
}

function handleResize(game) {
  game.setState({
    screen: {
      width: window.innerWidth,
      height: window.innerHeight,
      ratio: window.devicePixelRatio || 1
    }
  });
}
