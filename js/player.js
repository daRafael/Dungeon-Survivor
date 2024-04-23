class Player {
  constructor(gameScreen, left, top, health) {
    this.gameScreen = gameScreen;
    this.left = left;
    this.top = top;


    this.collisionContainer = document.createElement('div');
    this.attackContainer = document.createElement('div');
    this.hpContainer = document.createElement('div');
    this.playerHp = document.createElement('div');
    this.canvasAttack = document.createElement('canvas');
    this.canvas = document.createElement('canvas');


    //collision container
    this.gameScreen.appendChild(this.collisionContainer);
    this.collisionContainer.style.position = 'absolute';
    this.collisionContainer.style.display = 'flex';
    this.collisionContainer.style.justifyContent = 'center';
    this.collisionContainer.style.alignItems = 'center';
    this.collisionContainer.style.width = '15px';
    this.collisionContainer.style.height = '30px'
    this.collisionContainer.style.left = `${left}px`;
    this.collisionContainer.style.top = `${top}px`;
    

    this.directionX = 0;
    this.directionY = 0;

    //player Health
    this.collisionContainer.appendChild(this.hpContainer);
    this.hpContainer.style.position = 'absolute';
    this.hpContainer.style.border = '0.5px solid black';
    this.hpContainer.style.width = '20px';
    this.hpContainer.style.height = '2px';
    this.hpContainer.style.marginTop = '30px';

    this.hpContainer.appendChild(this.playerHp);
    this.playerHp.style.backgroundColor = 'darkred';
    this.health = health;
    this.playerHp.style.width = `${health}`;
    this.playerHp.style.height = '100%';
  

    //attack container
    this.collisionContainer.appendChild(this.attackContainer);
    this.attackContainer.style.position = 'absolute';
    this.attackContainer.style.border = '2px solid black';
    this.attackContainer.style.width = '65px';
    this.attackContainer.style.height = '25px';
    this.attackContainer.style.marginLeft = '90px';
    this.attackContainer.style.display = 'none';
    this.attackInterval; // Used in startAttackIntervalBelow
  

    //canvas elements for animations

    //attack animation
/*     this.attackContainer.appendChild(this.canvasAttack);
    this.ctxAttack = this.canvasAttack.getContext('2d');
    this.canvasAttack.style.width = `100px`;
    this.canvasAttack.style.height = `60px`;
    this.canvasAttackWidth = this.canvas.width = 65;
    this.canvasAttackHeight = this.canvas.height = 62;
    this.attackAnim = new Image();
    this.attackAnim.src = '/images/attack/atack.png';
 */

    //character animation
    this.collisionContainer.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.canvas.style.width = `64px`;
    this.canvas.style.height = `64px`;
    this.canvasWidth = this.canvas.width = 64;
    this.canvasHeight = this.canvas.height = 64;
    this.characterIdle = new Image();
    this.characterIdle.src = '/images/knight-character/Knight/noBKG_KnightIdle_strip.png';
    this.characterRun = new Image();
    this.characterRun.src = '/images/knight-character/Knight/noBKG_KnightRun_stripForJS.png';

    this.frameX = 0;
    this.gameFrame = 0;
    this.staggerFrames = 9;
  };


  move () {
    this.left += this.directionX;
    this.top += this.directionY;
    this.updatePosition();
  }

  updatePosition() {
    this.collisionContainer.style.left = `${this.left}px`;
    this.collisionContainer.style.top = `${this.top}px`;
  }

  updateHealthBar() {
    this.playerHp.style.width = `${this.health}%`;
  }

  //attack Pattern
  startAttackInterval() {
    this.attackInterval = setInterval(() => {
      this.showAttackContainer();
      setTimeout(() => {
        this.hideAttackContainer();
      }, 200);
    }, 2000);
  }

  showAttackContainer() {
    this.attackContainer.style.display = 'block';
  }

  hideAttackContainer() {
    this.attackContainer.style.display = 'none';
  }

  //attack collision logic
  didAttackHit(enemy) {
    const attackRect = this.attackContainer.getBoundingClientRect();
    const enemyRect = enemy.collisionContainer.getBoundingClientRect();

    if (
      attackRect.left < enemyRect.right &&
      attackRect.right > enemyRect.left &&
      attackRect.top < enemyRect.bottom &&
      attackRect.bottom > enemyRect.top
    ) {
      return true;
    }
  }


  //collision with player logic

  didPlayerCollide(enemy) {
    const playerRect = this.collisionContainer.getBoundingClientRect();
    const enemyRect = enemy.collisionContainer.getBoundingClientRect();


    if (
      playerRect.left < enemyRect.right &&
      playerRect.right > enemyRect.left &&
      playerRect.top < enemyRect.bottom &&
      playerRect.bottom > enemyRect.top
    ) {
      return true;
    }
  }



  //animations for player character

  //attack animations
/*   animationAttack() {
    this.ctxAttack.clearRect(0, 0, this.canvasAttackWidth, this.canvasAttackHeight);
    this.ctxAttack.drawImage(this.attackAnim, this.frameX * 65, 0, 65, 62, 0, 0, 65, 62);

    if(this.gameFrame % this.staggerFrames === 0) {
      if(this.frameX < 4) this.frameX ++;
      else this.frameX = 0;
    }

    requestAnimationFrame(this.animationAttack.bind(this))
  } */


  //character animations
  animationIdle() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.ctx.drawImage(this.characterIdle, this.frameX * 64, 0, 64, 64, 0, 0, 64, 64);
    
    if (this.gameFrame % this.staggerFrames === 0) {
      if (this.frameX < 14) this.frameX ++;
    else this.frameX = 0;
    }

    this.gameFrame++;
    requestAnimationFrame(this.animationIdle.bind(this));
  }

  animationRun() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.ctx.drawImage(this.characterRun, this.frameX * this.canvasWidth, 0, 64, 64, 0, 0, 64, 64);
                 
    if (this.gameFrame % this.staggerFrames === 0) {
      if (this.frameX < 7) this.frameX ++; 
    else this.frameX = 0;
    }

    this.gameFrame++;
    requestAnimationFrame(this.animationRun.bind(this));
  }
 
};