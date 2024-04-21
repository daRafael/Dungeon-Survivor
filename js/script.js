window.onload = () => {
  const startbutton = document.querySelector('.start-button');
  let game;

  game = new Game();
  game.start();

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
              break;
          case "ArrowUp":
              game.player.directionY = -1;
              break;
          case "ArrowRight":
              game.player.directionX = 1;
              break;
          case "ArrowDown":
              game.player.directionY = 1;
              break;
      }
    }
  };

  game.player.animationRun()

  window.addEventListener('keydown', handleKeyDown);



}
