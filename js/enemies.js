class Enemy {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    this.left = Math.floor(Math.random() * 1000);
    this.top = 0;


    this.collisionContainer = document.createElement('div');

    //collision container
    this.collisionContainer.style.position = 'absolute';
    this.collisionContainer.style.display = 'flex';
    this.collisionContainer.style.justifyContent = 'center';
    this.collisionContainer.style.alignItems = 'center';
    this.collisionContainer.style.width = '20px';
    this.collisionContainer.style.height = '30px';
    this.collisionContainer.style.border = '3px solid black';

    this.collisionContainer.style.left = `${this.left}px`;
    this.collisionContainer.style.top = `${this.top}px`;
    this.gameScreen.appendChild(this.collisionContainer);

    this.directionX = 0;
    this.directionY = 0;
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

}