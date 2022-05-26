const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

let a = new Scene2({ sceneTag: 'fight' });
gameLoop();

debugMode.switcher();

window.addEventListener('keydown', (event) => {
  const keyCode = event.code;

  if (keyCode === 'Backquote') {
    debugMode.switcher();
  } else if (keyCode === 'Space') {
    showMenu('pause');
  } else if (game.gameEntities.timer.isRunning) {
    if (
      Object.values({
        left: 'KeyA',
        right: 'KeyD',
        up: 'KeyW',
        down: 'KeyS',
      }).includes(keyCode)
    ) {
      game.gameEntities.player.control(keyCode, 'keydown');
    } else if (
      Object.values({
        left: 'ArrowLeft',
        right: 'ArrowRight',
        up: 'ArrowUp',
        down: 'ArrowDown',
      }).includes(keyCode)
    ) {
      game.gameEntities.enemy.control(keyCode, 'keydown');
    }
  }
});

window.addEventListener('keyup', (event) => {
  const keyCode = event.code;

  if (keyCode === 'Space') {
    showMenu('fight');
  } else if (game.gameEntities.timer.isRunning) {
    if (
      Object.values({
        left: 'KeyA',
        right: 'KeyD',
        up: 'KeyW',
        down: 'KeyS',
      }).includes(keyCode)
    ) {
      game.gameEntities.player.control(keyCode, 'keyup');
    } else if (
      Object.values({
        left: 'ArrowLeft',
        right: 'ArrowRight',
        up: 'ArrowUp',
        down: 'ArrowDown',
      }).includes(keyCode)
    ) {
      game.gameEntities.enemy.control(keyCode, 'keyup');
    }
  }
});

document.querySelector('#timer').addEventListener('click', () => {
  showMenu('pause');
});

document.querySelector('.pause__start-button').addEventListener('click', () => {
  showMenu('fight');
});
