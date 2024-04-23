class Game {
  constructor() {
    this.titleScreen = document.querySelector('.title-screen');
    this.gameScreen = document.querySelector('.map');
    this.player = new Player (
      this.gameScreen,
      500,
      500,
      100
    );
    this.IntervalId;
    this.gameLoopFrenquency = Math.round(1000/60);

    this.enemies = [];



  }

  start() {
    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
    }, this.gameLoopFrenquency);

    this.player.startAttackInterval();
  }

  gameLoop() {
    this.update();
  }

  update() {
    this.player.move();
    this.enemySpawn(); // function dealing with spawns
    this.didEnemiesCollide(); // collision enemy function

    this.enemies.forEach((enemy) => {
      enemy.moveEnemy(this.player.top, this.player.left); //follow function

      //player took damage
      if(this.player.didPlayerCollide(enemy)) {
        this.player.health -= 0.1;
        this.player.updateHealthBar();
      }
      //attack hit enemy
      if(this.player.didAttackHit(enemy)) {
        enemy.health -= 5;
        
        if(enemy.health <= 0) {
          enemy.collisionContainer.remove();
          this.enemies.splice(this.enemies.indexOf(enemy), 1);
        }
      }

      enemy.animationWalk();// enemy animation
    });
  }

  // Enemy Collision logic
  didEnemiesCollide() {
     for(let i = 0; i < this.enemies.length; i++) {
      const enemy1 = this.enemies[i];
      for(let j = i + 1; j < this.enemies.length; j++) {
        const enemy2 = this.enemies[j];
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
          enemy1.top += 0.2;
          enemy2.top -= 0.2;

        }
      }
    }
  }

  //Enemy spawn logic
  enemySpawn() {
    //enemies spawning from top
    if (Math.random() > 0.98 && this.enemies.length < 30) {
      this.enemies.push(
        new Enemy(this.gameScreen,
          Math.floor(Math.random() * 1000),
          this.player.top - 300)); 
    }
    //enemies spawning from bottom
    if (Math.random() > 0.98 && this.enemies.length < 30) {
      this.enemies.push(
        new Enemy(
          this.gameScreen,
          Math.floor(Math.random() * 1000), 
          this.player.top + 300)); 
    }
  }


}