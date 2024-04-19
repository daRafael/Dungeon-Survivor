window.onload = () => {
  const startbutton = document.querySelector('.start-button');

  let game;

  startbutton.addEventListener('click', () => {
    startGame();
  })

  function startGame () {
    console.log('game started');
    game = new Game();
    game.start();
  }

}