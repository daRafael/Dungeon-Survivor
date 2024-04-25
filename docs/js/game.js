class Game {
  constructor() {
    this.titleScreen = document.querySelector('.title-screen');
    this.gameScreen = document.querySelector('.camera');
    this.map = document.querySelector('.map');
    this.timer = document.querySelector('.timer');
    this.finalTime = document.querySelector('.final-time');
    this.skeletonCounter = document.getElementsByClassName('skeleton-counter');
    this.lvlDisplay = document.querySelector('.lvl');
    //gameover and victory screens queryselectors
    this.gameOverScreen = document.querySelector('.game-lost');
    this.gameWonScreen = document.querySelector('.game-won');

    // Player iteration
    this.player = new Player (
      this.map,
      500,
      500,
      100
    );

    this.IntervalId;
    this.gameLoopFrenquency = Math.round(1000/60);
    //enemies Array
    this.enemies = [];
    this.killCounter = 0;
    //EXP
    this.expArr = [];
    this.exp = 0;
    //LVL
    this.lvlCounter = 1;
    this.playerDamage = 3;
    //timer
    this.timerID;
    this.timerCounter = 0;
    //GAME OVER
    this.gameOver = false;
    //Soundtrack
    this.soundtrack = new Audio('./docs/sound/Midnight-Castle.mp3')
  }

  start() {
    this.titleScreen.style.display = 'none';
    this.gameScreen.style.display = 'block';

    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
    }, this.gameLoopFrenquency);

    this.player.startAttackInterval();
    this.player.animationIdle();
    this.startTimer();
    this.soundtrack.play();
  }

  gameLoop() {
    this.update();

    if(this.gameOver) {
      this.stopTimer();
    }
  }

  startTimer() {
    this.timerID = setInterval(() => {
      this.timerCounter++;
      let minutes = Math.floor(this.timerCounter / 60);
      let seconds = this.timerCounter % 60;
      if(seconds < 10) {
        this.timer.innerHTML = `0${minutes}:0${seconds}`
      } else {
        this.timer.innerHTML = `0${minutes}:${seconds}`
      }
    }, 1000);
  }

  stopTimer () {
    clearInterval(this.timerID);
  }

  update() {
    this.player.move();
    this.enemySpawn(); // Enemy Difficulty incrementation system
    this.didEnemiesCollide(); // collision enemy function
    this.playerLvlUp();// Player LVL up system
    this.playerGotExp();

    this.enemies.forEach((enemy) => {
      this.attackKilledEnemy(enemy);
      enemy.moveEnemy(this.player.top, this.player.left); //follow function
      enemy.animationWalk();// enemy animation

      //player took damage
      if(this.player.didPlayerCollide(enemy)) {
        this.player.health -= 0.1;
        this.player.updateHealthBar();
      }
      

      // VICTORY!
      if(this.timerCounter === 300) {
        this.endGameTimer();
        this.soundtrack.pause();
      }

      //GAME OVER!
      if(this.player.health <= 0) {
        this.endGameHp();
        this.soundtrack.pause();
      }

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
          enemy1Rect.left <= enemy2Rect.right &&
          enemy1Rect.right >= enemy2Rect.left &&
          enemy1Rect.top <= enemy2Rect.bottom &&
          enemy1Rect.bottom >= enemy2Rect.top
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
    //LVL 1
    //enemies spawning from top
    if (Math.random() > 0.98 && this.enemies.length < 40) {
      this.enemies.push(
        new Enemy(this.map,
          Math.floor(Math.random() * 1000),
          this.player.top - 300)); 
    }
    //enemies spawning from bottom
    if (Math.random() > 0.98 && this.enemies.length < 40) {
      this.enemies.push(
        new Enemy(
          this.map,
          Math.floor(Math.random() * 1000), 
          this.player.top + 300)); 
    }
    //LVL 2
    if (this.timerCounter === 60) {
      //enemies spawning from top
      if (Math.random() > 0 && this.enemies.length < 60) {
        this.enemies.push(
          new Enemy(this.map,
            Math.floor(Math.random() * 1000),
            this.player.top - 300)); 
      }
      //enemies spawning from bottom
      if (Math.random() > 0 && this.enemies.length < 60) {
        this.enemies.push(
          new Enemy(
            this.map,
            Math.floor(Math.random() * 1000), 
            this.player.top + 300)); 
      }
    }
    //LVL 3
    if (this.timerCounter === 120) {
      //enemies spawning from top
      if (Math.random() > 0 && this.enemies.length < 80) {
        this.enemies.push(
          new Enemy(this.map,
            Math.floor(Math.random() * 1000),
            this.player.top - 300)); 
      }
      //enemies spawning from bottom
      if (Math.random() > 0 && this.enemies.length < 80) {
        this.enemies.push(
          new Enemy(
            this.map,
            Math.floor(Math.random() * 1000), 
            this.player.top + 300)); 
      }
    }
    //LVL 4
    if (this.timerCounter === 180) {
      //enemies spawning from top
      if (Math.random() > 0 && this.enemies.length < 90) {
        this.enemies.push(
          new Enemy(this.map,
            Math.floor(Math.random() * 1000),
            this.player.top - 300)); 
      }
      //enemies spawning from bottom
      if (Math.random() > 0 && this.enemies.length < 90) {
        this.enemies.push(
          new Enemy(
            this.map,
            Math.floor(Math.random() * 1000), 
            this.player.top + 300)); 
      }
    }
    //LVL 5
    if (this.timerCounter === 240) {
      //enemies spawning from top
      if (Math.random() > 0 && this.enemies.length < 110) {
        this.enemies.push(
          new Enemy(this.map,
            Math.floor(Math.random() * 1000),
            this.player.top - 300)); 
      }
      //enemies spawning from bottom
      if (Math.random() > 0 && this.enemies.length < 110) {
        this.enemies.push(
          new Enemy(
            this.map,
            Math.floor(Math.random() * 1000), 
            this.player.top + 300)); 
      }
    }
    //LVL 6
    if (this.timerCounter === 280) {
      //enemies spawning from top
      if (Math.random() > 0 && this.enemies.length < 130) {
        this.enemies.push(
          new Enemy(this.map,
            Math.floor(Math.random() * 1000),
            this.player.top - 300)); 
      }
      //enemies spawning from bottom
      if (Math.random() > 0 && this.enemies.length < 130) {
        this.enemies.push(
          new Enemy(
            this.map,
            Math.floor(Math.random() * 1000), 
            this.player.top + 300)); 
      }
    }
  }

  skeletonCounterDisplay () {
    for(let i = 0; i < this.skeletonCounter.length; i++) {
      const counter = this.skeletonCounter[i];
      counter.innerHTML = `${this.killCounter}`;
    }
  }

  //LVL incrementation and damage
  playerLvlUp () {
    //PLAYER LVL 2
    if(this.exp === 8 && this.lvlCounter === 1) {
      this.lvlCounter ++;
      this.playerDamage += 0.5;
      this.lvlDisplay.innerHTML = `Level ${this.lvlCounter}`;
    }
    //PLAYER LVL 3
    if(this.exp === 16 && this.lvlCounter === 2) {
      this.lvlCounter ++;
      this.playerDamage += 0.5;
      this.lvlDisplay.innerHTML = `Level ${this.lvlCounter}`;

    }
    //PLAYER LVL 4
    if(this.exp === 24 && this.lvlCounter === 3) {
      this.lvlCounter ++;
      this.playerDamage += 0.5;
      this.lvlDisplay.innerHTML = `Level ${this.lvlCounter}`;
    }
    //PLAYER LVL 5
    if (this.exp === 32 && this.lvlCounter === 4) {
      this.lvlCounter ++;
      this.playerDamage += 0.5;
      this.lvlDisplay.innerHTML = `Level ${this.lvlCounter}`;

    }
    //PLAYER LVL 6
    if (this.exp === 40 && this.lvlCounter === 5) {
      this.lvlCounter ++;
      this.playerDamage += 0.5
      this.lvlDisplay.innerHTML = `Level ${this.lvlCounter}`;
    }
    //PLAYER LVL 7
    if (this.exp === 48 && this.lvlCounter === 6) {
      this.lvlCounter ++;
      this.playerDamage += 0.5;
      this.lvlDisplay.innerHTML = `Level ${this.lvlCounter}`;
    }
    //PLAYER LVL 8
    if (this.exp === 56 && this.lvlCounter === 7) {
      this.lvlCounter ++;
      this.playerDamage += 0.5
      this.lvlDisplay.innerHTML = `Level ${this.lvlCounter}`;
    }
    //PLAYER LVL 9
    if (this.exp === 62 && this.lvlCounter === 8) {
      this.lvlCounter ++;
      this.playerDamage += 0.5;
      this.lvlDisplay.innerHTML = `Level ${this.lvlCounter}`;
    }
    //PLAYER LVL 10
    if(this.exp >= 70 && this.lvlCounter === 9) {
      this.lvlCounter ++;
      this.playerDamage += 0.5;
      this.lvlDisplay.innerHTML = `Level ${this.lvlCounter}`;
    }
  }

  //attack killed enemy
  attackKilledEnemy(enemy) {
    if(this.player.didAttackHit(enemy)) {
      enemy.health -= this.playerDamage;
    }
    if(enemy.health <= 0) {
      this.expArr.push(
        new Experience(
          this.map,
          enemy.left,
          enemy.top
        )
      )
      enemy.collisionContainer.remove();
      this.enemies.splice(this.enemies.indexOf(enemy), 1);
      this.killCounter ++;
    }
  }
  // player exp incrementation
  playerGotExp() {
    this.expArr.forEach((exp) => {
      if(this.player.didPlayerGetExp(exp)) {
        exp.expContainer.remove();
        this.expArr.splice(this.expArr.indexOf(exp), 1);
        this.exp++;
        console.log(this.exp);
      }
    });
  }

  //End Game
  endGameTimer() {
    this.player.collisionContainer.remove();
    this.enemies.forEach((enemy) => {
      enemy.collisionContainer.remove();
    });
    this.gameOver = true;
    this.gameWonScreen.style.display = 'flex';

    //skeleton kill counter
    this.skeletonCounterDisplay();
  }

  endGameHp() {
    this.player.collisionContainer.remove();
    this.timer.remove();
    this.enemies.forEach((enemy) => {
      enemy.collisionContainer.remove();
    });
    this.gameOver = true;
    this.gameOverScreen.style.display = 'flex';
    
    //timer record
    const minutes = Math.floor(this.timerCounter / 60);
    const seconds = this.timerCounter % 60;

    if(seconds < 10) {
      this.finalTime.innerHTML = `0${minutes}:0${seconds}`
    } else {
      this.finalTime.innerHTML = `0${minutes}:${seconds}`
    }
    //skeleton kill counter
    this.skeletonCounterDisplay();
  }
}