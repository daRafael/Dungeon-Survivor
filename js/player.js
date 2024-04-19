class Player {
  constructor(gameScreen, width, height) {
    this.gameScreen = gameScreen;
    this.width = width;
    this.height = height;
    this.element = document.createElement('img');
    this.element.style.backgroundColor = 'pink'
    this.element.style.width = `${width}px`;
    this.element.style.height = `${height}px`;
    this.gameScreen.appendChild(this.element);
  }

}