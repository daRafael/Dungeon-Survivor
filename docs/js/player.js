class Player {
  constructor(map, left, top, health) {
    this.map = map;
    this.left = left;
    this.top = top;
  
    this.collisionContainer = document.createElement('div');
    this.attackContainer = document.createElement('div');
    this.hpContainer = document.createElement('div');
    this.playerHp = document.createElement('div');
    this.canvasAttack = document.createElement('canvas');
    this.canvas = document.createElement('canvas');

    this.map = document.querySelector('.map');

    //camera
    this.camera = document.querySelector('.camera');
    this.cameraWidth = 500;
    this.cameraHeight = 500;
    this.camera.style.width = `${this.cameraWidth}px`;
    this.camera.style.height = `${this.cameraHeight}px`;


    //collision container
    this.map.appendChild(this.collisionContainer);
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

    this.isWalking = false;

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
    this.attackContainer.style.width = '65px';
    this.attackContainer.style.height = '25px';
    this.attackContainer.style.marginLeft = '90px';
    this.attackContainer.style.display = 'none';
    this.attackInterval; // Used in startAttackIntervalBelow
  

    //canvas elements for animations

    //attack animation
    this.attackContainer.appendChild(this.canvasAttack);
    this.ctxAttack = this.canvasAttack.getContext('2d');
    this.canvasAttack.style.width = `122px`;
    this.canvasAttack.style.height = `100px`;
    this.canvasAttackWidth = this.canvasAttack.width = 120;
    this.canvasAttackHeight = this.canvasAttack.height = 120;
    this.attackAnim = new Image();
    this.attackAnim.src = './docs/images/attack.png';
    this.frameXAttack = 0;
    this.staggerFramesAttack = 1;


    //character animation
    this.collisionContainer.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.canvas.style.width = `64px`;
    this.canvas.style.height = `64px`;
    this.canvasWidth = this.canvas.width = 64;
    this.canvasHeight = this.canvas.height = 64;
    this.characterIdle = new Image();
    this.characterIdle.src = './docs/images/idle-player.png';
    this.characterRun = new Image();
    this.characterRun.src = './docs/images/run-player.png';

    this.frameX = 0;
    this.gameFrame = 0;
    this.staggerFrames = 12;
  };


  move () {
    this.left += this.directionX;
    this.top += this.directionY;

    //player within bounds of map
    if (this.left <= 0) {
      this.left = 0;
    }
    if(this.left >= 980) {
      this.left = 980;
    }
    if(this.top <= 0) {
      this.top = 0;
    }
    if(this.top >= 970) {
      this.top = 970;
    }

    this.updatePosition();
  }

  updatePosition() {
    this.collisionContainer.style.left = `${this.left}px`;
    this.collisionContainer.style.top = `${this.top}px`;

    const cameraLeft = this.left - (this.cameraWidth / 2) + (15 / 2);
    const cameraTop = this.top - (this.cameraHeight / 2) + (30 / 2);

    this.map.style.left = `-${cameraLeft}px`;
    this.map.style.top = `-${cameraTop}px`;
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
      }, 400);
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

  didPlayerGetExp(exp) {
    const playerRect = this.collisionContainer.getBoundingClientRect();
    const expRect = exp.expContainer.getBoundingClientRect();


    if (
      playerRect.left < expRect.right &&
      playerRect.right > expRect.left &&
      playerRect.top < expRect.bottom &&
      playerRect.bottom > expRect.top
    ) {
      return true;
    }
  }



  //animations for player character

  //attack animations
  animationAttack() {
    this.ctxAttack.clearRect(0, 0, this.canvasAttackWidth, this.canvasAttackHeight);
    this.ctxAttack.drawImage(this.attackAnim, this.frameXAttack * 65, 0, 65, 27, 0, 0, 65, 27);

    if (this.gameFrame % this.staggerFramesAttack === 0) {
      if (this.frameXAttack < 3) this.frameXAttack ++;
    else this.frameXAttack = 0;
    }

    requestAnimationFrame(this.animationAttack.bind(this));
  }


  //character animations
  animationIdle() {
    this.stopAnimationIdle();
    const animate = () => {
      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      this.ctx.drawImage(this.characterIdle, this.frameX * 64, 0, 64, 64, 0, 0, 64, 64);
      
      if (this.gameFrame % this.staggerFrames === 0) {
        if (this.frameX < 14) this.frameX ++;
      else this.frameX = 0;
      }

      this.gameFrame++;
      this.animationIdleID = requestAnimationFrame(animate);
    }

    animate();
  }
    
  stopAnimationIdle () {
    cancelAnimationFrame(this.animationIdleID);
  }

  animationRun() {
    this.stopAnimationRun();
    const animate = () => {
      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      this.ctx.drawImage(this.characterRun, this.frameX * 64, 0, 64, 64, 0, 0, 64, 64);
                  
      if (this.gameFrame % this.staggerFrames === 0) {
        if (this.frameX < 7) this.frameX ++; 
      else this.frameX = 0;
      }
  
      this.gameFrame++;
      this.animationRunID = requestAnimationFrame(animate)
    }
    animate();
  }

  stopAnimationRun() {
    cancelAnimationFrame(this.animationRunID);
  }

};