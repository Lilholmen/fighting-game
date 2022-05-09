const background = new Sprite({
  position: { x: 0, y: 0 },
  imageSrc: './img/background.png',
});

const shop = new Sprite({
  position: { x: 570, y: 163 },
  imageSrc: './img/shop.png',
  scale: { x: 2.75, y: 2.75 },
  frames: 6,
});

const game = new Game({
  player: getFighter({ type: 'P1', skin: 'character7' }),
  enemy: getFighter({ type: 'P2', skin: 'enemy' }),
  timer: new Timer({ duration: 99 }),
  gravity: 0.7,
  playerSkin: 7,
});

function gameLoop() {
  showMenu('menu');
  if (game.gameState.currentState === 'menu') {
    animate();
  } else if (game.gameState.currentState === 'finish') {
    game.gameEntities.player = getFighter({ type: 'P1', skin: 'character2' });
    game.gameEntities.enemy = getFighter({ type: 'P2', skin: 'enemy' });
    game.gameEntities.timer.restart(30);

    showMenu('menu');
  }
}

function animate() {
  if (!game.gameEntities.player.isDead && !game.gameEntities.enemy.isDead) {
    window.requestAnimationFrame(animate);

    if (debugMode.isOn) {
      getDebugInfo(game.gameEntities.player, game.gameEntities.enemy);
    }

    background.update();
    shop.update();

    c.fillStyle = 'rgba(255,255,255, 0.1';
    c.fillRect(0, 0, canvas.width, canvas.height);

    if (game.gameEntities.timer.isRunning) {
      game.gameEntities.player.update();
      game.gameEntities.enemy.update();

      fighterCollision(
        game.gameEntities.player,
        game.gameEntities.enemy,
        game.gameEntities.timer
      );
      fighterCollision(
        game.gameEntities.enemy,
        game.gameEntities.player,
        game.gameEntities.timer
      );
    }
  } else {
    game.gameEntities.timer.end();
    game.gameState.changeState = 'finish';

    gameLoop();
  }
}
