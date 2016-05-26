export default class EventHandler {
  constructor(game) {
    this.mount(game);
  }

  mount(game) {
    window.addEventListener('keydown', () => handleKeys.bind(game));
    window.addEventListener('resize',  this.handleResize.bind(this, game));
    window.addEventListener('click',  this.handleClick.bind(this, game));
    window.addEventListener('touchstart',  this.handleTouch.bind(this, game));
  }

  handleKeys(game, e) {
    const keyCodes = {
      32: game.pauseGame,
      13: game.startGame
    }

    if(game.state.inGame){
      game.state.partySquare[0].respondToUser(e.keyCode, game.state);
      keyCodes[e.keyCode]()
    }

  }

  handleClick(game, e) {
    if(e.toElement.className === "startgame") {
      game.startGame();
    }
  }

  handleTouch(game, e) {
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

  handleResize(game) {
    game.setState({
      screen: {
        width: window.innerWidth,
        height: window.innerHeight,
        ratio: window.devicePixelRatio || 1
      }
    });
  }
}
