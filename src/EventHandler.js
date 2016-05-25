export default class EventHandler {
  constructor(game) {
    this.mount(game);
  }

  mount(game) {
    window.addEventListener('keydown', this.handleKeys.bind(this, game));
    window.addEventListener('resize',  this.handleResize.bind(this, game));
    window.addEventListener('click',  this.handleClick.bind(this, game));
  }

  handleKeys(game, e) {
    if(game.state.inGame){
      game.state.partySquare[0].respondToUser(e.keyCode, game.state);
    }

    if(game.state.inGame && e.keyCode === 32){
      game.togglePause();
    }

    if(!game.state.inGame && e.keyCode === 13){
      game.restartGame();
    }
  }

  handleClick(game, e) {
    if(e.toElement.className === "startgame") {
      game.restartGame();
    }
  }

  handleResize(game) {
    game.setState({
      screen: {
        width: window.innerWidth,
        height: window.innerHeight,
        ration: window.devicePixelRatio || 1
      }
    });
  }
}
