class Experience {
    constructor(map, left, top) {
      this.map = map;
      this.left = left;
      this.top = top;
  
  
      this.expContainer = document.createElement('div');
      this.exp = document.createElement('img');
  
      //collision container
      this.expContainer.style.position = 'absolute';
      this.expContainer.style.display = 'flex';
      this.expContainer.style.justifyContent = 'center';
      this.expContainer.style.alignItems = 'center';
      this.expContainer.style.zIndex = '5';
      this.expContainer.style.width = '8px';
      this.expContainer.style.height = '8px';

      this.expContainer.appendChild(this.exp);
      this.exp.src = './docs/images/exp.png'
      this.exp.style.width = '160%';
  
      this.expContainer.style.left = `${this.left}px`;
      this.expContainer.style.top = `${this.top}px`;
      this.map.appendChild(this.expContainer);
  }
}