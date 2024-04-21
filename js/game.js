class Game {
  constructor() {
    this.titleScreen = document.querySelector('.title-screen');
    this.gameScreen = document.querySelector('.map');
    this.player = new Player (
      this.gameScreen,
      500,
      500
    );
    this.IntervalId;
    this.gameLoopFrenquency = Math.round(1000/60);
  }

  start() {
    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
    }, this.gameLoopFrenquency);
  }

  gameLoop() {
    this.update();
    console.log('in the game loop')
  }

  update() {
    this.player.move();
  }
}