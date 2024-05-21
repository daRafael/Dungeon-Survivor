class Enemy {
  constructor(map, left, top) {
    this.map = map;
    this.left = left;
    this.top = top;

    this.collisionContainer = document.createElement('div');
    this.canvas = document.createElement('canvas');

    // Collision container
    this.collisionContainer.style.position = 'absolute';
    this.collisionContainer.style.display = 'flex';
    this.collisionContainer.style.justifyContent = 'center';
    this.collisionContainer.style.alignItems = 'center';
    this.collisionContainer.style.width = '16px';
    this.collisionContainer.style.height = '30px';
    this.collisionContainer.style.zIndex = '10';

    this.collisionContainer.style.left = `${this.left}px`;
    this.collisionContainer.style.top = `${this.top}px`;
    this.map.appendChild(this.collisionContainer);

    this.directionX = 0;
    this.directionY = 0;

    // Enemy health
    this.health = 100;

    // Canvas element for animations
    this.collisionContainer.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.canvas.style.width = `100px`;
    this.canvas.style.height = `100px`;
    this.canvasWidth = this.canvas.width = 150;
    this.canvasHeight = this.canvas.height = 150;
    this.enemyWalk = new Image();
    this.enemyWalk.src = './docs/images/Skel-Walk.png';

    this.frameX = 0;
    this.gameFrame = 0;
    this.staggerFrames = 10;
  }

  updatePosition() {
    this.collisionContainer.style.left = `${this.left}px`;
    this.collisionContainer.style.top = `${this.top}px`;
  }

  moveEnemy(playerTop, playerLeft, allEnemies) {
    // Calculate the direction towards the player
    let deltaX = playerLeft - this.left;
    let deltaY = playerTop - this.top;

    let distanceToPlayer = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    let directionX = deltaX / distanceToPlayer;
    let directionY = deltaY / distanceToPlayer;

    // Separation force
    let separationX = 0;
    let separationY = 0;
    let separationDistance = 30; // Distance to maintain between enemies

    allEnemies.forEach(enemy => {
      if (enemy !== this) {
        let dx = this.left - enemy.left;
        let dy = this.top - enemy.top;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < separationDistance) {
          separationX += (this.left - enemy.left) / distance;
          separationY += (this.top - enemy.top) / distance;
        }
      }
    });

    // Normalize the separation vector
    let separationLength = Math.sqrt(separationX * separationX + separationY * separationY);
    if (separationLength > 0) {
      separationX /= separationLength;
      separationY /= separationLength;
    }

    // Combine the direction to the player and the separation force
    let combinedX = directionX + separationX;
    let combinedY = directionY + separationY;

    // Normalize the combined direction
    let combinedLength = Math.sqrt(combinedX * combinedX + combinedY * combinedY);
    combinedX /= combinedLength;
    combinedY /= combinedLength;

    // Move the enemy
    this.left += combinedX * 0.4;
    this.top += combinedY * 0.4;

    // Flip the enemy horizontally based on the direction it's moving
    if (playerLeft > this.left) {
      this.collisionContainer.classList.remove('flip-horizontal');
    } else {
      this.collisionContainer.classList.add('flip-horizontal');
    }

    this.updatePosition();
  }

  animationWalk() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.ctx.drawImage(this.enemyWalk, this.frameX * this.canvasWidth, 0, 150, 150, 0, 0, 150, 150);
    if (this.gameFrame % this.staggerFrames === 0) {
      if (this.frameX < 3) this.frameX++;
      else this.frameX = 0;
    }

    this.gameFrame++;
  }
}