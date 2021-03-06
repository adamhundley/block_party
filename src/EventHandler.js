export default class EventHandler {
  constructor(game) {
    this.mount(game);
  }

  mount(game) {
    window.addEventListener('keydown', this.handleKeys.bind(this, game));
    window.addEventListener('resize',  this.handleResize.bind(this, game));
    window.addEventListener('click',  this.handleClick.bind(this, game));
    window.addEventListener('touchstart',  this.handleTouch.bind(this, game));
    window.addEventListener('orientationchange', this.handleOrientationChange.bind(this, game));
    window.addEventListener('orientationchange', this.handleResize.bind(this, game));
  }

  handleOrientationChange(game, e) {
    if(game.state.paused && !game.state.currentScore){
      game.setState({
        paused: false,
        landscape: game.landscape()
      })
      game.startGame();
      requestAnimationFrame(() => {game.updateGame();})
    } else if (!game.state.paused) {
      document.querySelector('canvas').style.display="none"
      document.getElementsByClassName('colorBoxes')[0].style.display="none"
      game.pauseGame();
    } else if (game.state.paused) {
      document.querySelector('canvas').style.display=""
      document.getElementsByClassName('colorBoxes')[0].style.display=""
      game.pauseGame();
    }
  }

  handleKeys(game, e) {
    if(game.state.inGame){
      game.state.partySquare[0].respondToUser(e.keyCode, game.state);
    }

    if(game.state.inGame && e.keyCode === 32){
      game.pauseGame();
    }

    if(e.keyCode === 13 && !game.state.inGame && !game.state.newTopScore){
      game.startGame();
    }
  }

  handleClick(game, e) {
    if(e.toElement.className === "startgame") {
      game.startGame();
    } else if (e.toElement.className === "playagain") {
      document.getElementById("nameForm").submit()
    }
  }

  handleTouch(game, e) {
    if(game.state.inGame){
      e.preventDefault();
      let touchPoints = e.changedTouches;
      let y = touchPoints[touchPoints.length - 1].pageY

      if(touchPoints[touchPoints.length - 1].pageX < game.state.screen.height / 4){
        game.state.partySquare[0].respondToTouch('color', game.state, y);
      } else if (touchPoints[touchPoints.length - 1].pageX > game.state.screen.height / 4) {
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
