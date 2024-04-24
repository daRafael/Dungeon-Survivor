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
    game.player.animationRun();
    game.player.animationAttack();
  }

  function goToMenu() {
    location.reload();
  }

  function handleKeyDown() {
    const key = event.key;
    const possibleKeystrokes = [
      "ArrowLeft",
      "ArrowUp",
      "ArrowRight",
      "ArrowDown",
    ];
    
    if (possibleKeystrokes.includes(key)) {
        event.preventDefault();
    
        switch (key) {
          case "ArrowLeft":
              game.player.directionX = -1;
              game.player.attackLeft();
              break;
          case "ArrowUp":
              game.player.directionY = -1;
              break;
          case "ArrowRight":
              game.player.directionX = 1;
              game.player.attackRight();
              break;
          case "ArrowDown":
              game.player.directionY = 1;
              break;
      }
    }

  };


  window.addEventListener('keydown', handleKeyDown);

}
