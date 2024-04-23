class Enemy {
  constructor(map, left, top) {
    this.map = map;
    this.left = left;
    this.top = top;


    this.collisionContainer = document.createElement('div');
    this.canvas = document.createElement('canvas');

    //collision container
    this.collisionContainer.style.position = 'absolute';
    this.collisionContainer.style.display = 'flex';
    this.collisionContainer.style.justifyContent = 'center';
    this.collisionContainer.style.alignItems = 'center';
    this.collisionContainer.style.width = '16px';
    this.collisionContainer.style.height = '30px';

    this.collisionContainer.style.left = `${this.left}px`;
    this.collisionContainer.style.top = `${this.top}px`;
    this.map.appendChild(this.collisionContainer);

    this.directionX = 0;
    this.directionY = 0;

    //enemy health
    this.health = 100;

    //canvas element for animations
    this.collisionContainer.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.canvas.style.width = `100px`;
    this.canvas.style.height = `100px`;
    this.canvasWidth = this.canvas.width = 150;
    this.canvasHeight = this.canvas.height = 150;
    this.enemyWalk = new Image();
    this.enemyWalk.src = 'images/skeleton-enemy/Monsters_Creatures_Fantasy/Skeleton/Walk.png';

    this.frameX = 0;
    this.gameFrame = 0;
    this.staggerFrames =  10;
}


  updatePosition() {
    this.collisionContainer.style.left = `${this.left}px`;
    this.collisionContainer.style.top = `${this.top}px`;
  }


  moveEnemy(playerTop, playerLeft) {

      if(playerTop > this.top) {
        this.top += 0.4;

      } else if (playerTop < this.top) {
        this.top -= 0.4;
      }
  
      if(playerLeft > this.left) {
        this.left += 0.4;
      } 
      else if (playerLeft< this.left) {
        this.left -= 0.4;
      }

      this.updatePosition();
  }

  animationWalk() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.ctx.drawImage(this.enemyWalk, this.frameX * this.canvasWidth, 0, 150, 150, 0, 0, 150, 150);
    if (this.gameFrame % this.staggerFrames === 0) {
      if (this.frameX < 3) this.frameX ++; 
      else this.frameX = 0;
      
    }

    this.gameFrame++;
  }
}