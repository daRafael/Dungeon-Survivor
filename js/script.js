window.onload = () => {
  const startButton = document.querySelector('.start-button');
  const retryButton = document.querySelector('.retry-button');
  const playAgainButton = document.querySelector('.play-again-button');
  let game = new Game();

  startButton.addEventListener('click', () => {
    startGame();
  });
  retryButton.addEventListener('click', () => {
    location.reload()
  });
  playAgainButton.addEventListener('click', () => {
    location.reload();
  });

  function startGame() {
    game.start();
    game.player.animationAttack();
  }

  function goToMenu() {
    location.reload();
  }


  //handeling responsive keyboard movement
  const possibleKeystrokes = [
    "ArrowLeft",
    "ArrowUp",
    "ArrowRight",
    "ArrowDown",
  ];

  const heldKeys = [];
  
  function handleKeyDown() {
    const key = event.key;
    
    if (possibleKeystrokes.includes(key) && !heldKeys.includes(key)) {
        event.preventDefault(); // Prevents the browser defaul behavior for arrow keys
        heldKeys.push(key);
        updatePlayerDirection();
        game.player.animationRun();
    }

  };

  function handleKeyUp() {
    const key = event.key;
    const keyIndex = heldKeys.indexOf(key);
    game.player.animationIdle();
  
    if(keyIndex !== -1) {
      heldKeys.splice(keyIndex, 1);
      updatePlayerDirection();
      //reseting the frame counters to switch to animation idle
      game.frame.frameX = 0;
      game.player.gameFrame = 0;
    }
  }

  function updatePlayerDirection() {
    game.player.directionX = 0;
    game.player.directionY = 0;

    heldKeys.forEach((key) => {

      switch (key) {
        case 'ArrowLeft':
          game.player.directionX -= 1;
          game.player.collisionContainer.classList.add('flip-horizontal');
          break;
        case 'ArrowUp':
          game.player.directionY -= 1;
          break;
        case 'ArrowRight':
          game.player.directionX += 1;
          game.player.collisionContainer.classList.remove('flip-horizontal');
          break;
        case 'ArrowDown':
          game.player.directionY += 1;
          break;
      }
    });
  }

  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('keyup', handleKeyUp);

}
