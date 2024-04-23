window.onload = () => {
  const startbutton = document.querySelector('.start-button');
  let game = new Game();

  startbutton.addEventListener('click', () => {
    game.start();
    console.log(game);
    game.player.animationIdle();
  });
  
  console.log(game)
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


  window.addEventListener('keydown', handleKeyDown);

}
