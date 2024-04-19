class Game {
  constructor() {
    this.titleScreen = document.querySelector('.title-screen');
    this.gameScreen = document.querySelector('.game-screen');
    this.player = new Player(
      this.gameScreen,
      30,
      40
    )
  }

  start() {
    this.titleScreen.style.display = 'none'
    this.gameScreen.style.display = 'flex';
  }
}