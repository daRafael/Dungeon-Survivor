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

    this.enemiesTop = [];
  }

  start() {
    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
    }, this.gameLoopFrenquency);

    this.player.startAttackInterval();
  }

  gameLoop() {
    this.update();
    console.log('in the game loop')
  }

  update() {
    this.player.move();
    

    if (Math.random() > 0.98 && this.enemiesTop.length < 10) {
      this.enemiesTop.push(new Enemy(this.gameScreen)); 
    }


    this.enemiesTop.forEach((enemy) => {
      enemy.moveEnemy(this.player.top, this.player.left); //follow function
      this.player.didPlayerCollide(enemy); // player collision function
      this.player.didAttackHit(enemy); // attack collison function
      enemy.animationWalk();
    });




    this.didEnemiesCollide();
  }

  didEnemiesCollide() {

     for(let i = 0; i < this.enemiesTop.length; i++) {
      const enemy1 = this.enemiesTop[i];
      for(let j = i + 1; j < this.enemiesTop.length; j++) {
        const enemy2 = this.enemiesTop[j];
        const enemy1Rect = enemy1.collisionContainer.getBoundingClientRect();
        const enemy2Rect = enemy2.collisionContainer.getBoundingClientRect();

        if (
          enemy1Rect.left < enemy2Rect.right &&
          enemy1Rect.right > enemy2Rect.left &&
          enemy1Rect.top < enemy2Rect.bottom &&
          enemy1Rect.bottom > enemy2Rect.top
        )
        {
          enemy1.left += 0.2;
          enemy2.left -= 0.2;

        }
      }
    }
  }


}