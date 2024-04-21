class Player {
  constructor(gameScreen, left, top) {
    this.gameScreen = gameScreen;
    this.left = left;
    this.top = top;


    this.collisionContainer = document.createElement('div');
    this.canvas = document.createElement('canvas');

    //collision container
    this.collisionContainer.style.position = 'absolute';
    this.collisionContainer.style.display = 'flex';
    this.collisionContainer.style.justifyContent = 'center';
    this.collisionContainer.style.alignItems = 'center';
    this.collisionContainer.style.width = '20px';
    this.collisionContainer.style.height = '30px'
    this.collisionContainer.style.border = '1px solid black'

    this.collisionContainer.style.left = `${left}px`;
    this.collisionContainer.style.top = `${top}px`;
    this.gameScreen.appendChild(this.collisionContainer);

    this.directionX = 0;
    this.directionY = 0;

    //canvas element for animations
    this.collisionContainer.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.collisionContainer.style.position = 'absolute';
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
    this.staggerFrames = 15;
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








  //animations for player character
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