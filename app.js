const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

gameLoop();

//debugMode.switcher();

function animate() {
  if (!gameEntities.player.isDead && !gameEntities.enemy.isDead) {
    window.requestAnimationFrame(animate);

    if (debugMode.isOn) {
      getDebugInfo(gameEntities.player, gameEntities.enemy);
    }

    background.update();
    shop.update();

    c.fillStyle = 'rgba(255,255,255, 0.1';
    c.fillRect(0, 0, canvas.width, canvas.height);

    if (gameEntities.timer.isRunning) {
      gameEntities.player.update();
      gameEntities.enemy.update();

      fighterCollision(
        gameEntities.player,
        gameEntities.enemy,
        gameEntities.timer
      );
      fighterCollision(
        gameEntities.enemy,
        gameEntities.player,
        gameEntities.timer
      );
    }
  } else {
    gameEntities.timer.end();
    gameState.changeState = 3;
    gameLoop();
  }
}

window.addEventListener('keydown', (event) => {
  const keyCode = event.code;

  if (keyCode === 'Backquote') {
    debugMode.switcher();
  } else if (keyCode === 'Space') {
    showMenu('pause');
  } else if (gameEntities.timer.isRunning) {
    if (
      Object.values({
        left: 'KeyA',
        right: 'KeyD',
        up: 'KeyW',
        down: 'KeyS',
      }).includes(keyCode)
    ) {
      gameEntities.player.control(keyCode, 'keydown');
    } else if (
      Object.values({
        left: 'ArrowLeft',
        right: 'ArrowRight',
        up: 'ArrowUp',
        down: 'ArrowDown',
      }).includes(keyCode)
    ) {
      gameEntities.enemy.control(keyCode, 'keydown');
    }
  }
});

window.addEventListener('keyup', (event) => {
  const keyCode = event.code;

  if (keyCode === 'Space') {
    showMenu('continue');
  } else if (gameEntities.timer.isRunning) {
    if (
      Object.values({
        left: 'KeyA',
        right: 'KeyD',
        up: 'KeyW',
        down: 'KeyS',
      }).includes(keyCode)
    ) {
      gameEntities.player.control(keyCode, 'keyup');
    } else if (
      Object.values({
        left: 'ArrowLeft',
        right: 'ArrowRight',
        up: 'ArrowUp',
        down: 'ArrowDown',
      }).includes(keyCode)
    ) {
      gameEntities.enemy.control(keyCode, 'keyup');
    }
  }
});

document.querySelector('#timer').addEventListener('click', () => {
  showMenu('pause');
});
