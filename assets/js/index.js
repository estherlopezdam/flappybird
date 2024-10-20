window.addEventListener('load', () => {
  // iteration - 1: create & start the game
  const game = new Game("canvas-game");

  game.start();
  // iteration - 2: add key listeners to the game
  document.addEventListener('keydown', (e) => game.onKeyEvent(e));
  
  document.addEventListener('keyup', (e) => game.onKeyEvent(e));

  document.addEventListener('click', (e) => game.restart(e));
});
