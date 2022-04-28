const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

const gravity = 0.7;

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

const gameEntities = {
  player: null,
  enemy: null,
  timer: null,
};

start();

function start() {
  gameEntities.player = getFighter({ type: 'P1', skin: 'character1' });

  gameEntities.enemy = getFighter({ type: 'P2', skin: 'enemy' });

  gameEntities.timer = new Timer({ duration: 99 });

  showMenu('firstStart');
  console.log(gameEntities);

  animate();
}

/* const player = getFighter({ type: 'P1', skin: 'character7' });

const enemy = getFighter({ type: 'P2', skin: 'enemy' });

const timer = new Timer({ duration: 99 });

showMenu('firstStart');

animate(); */

function animate() {
  window.requestAnimationFrame(animate);

  background.update();
  shop.update();

  c.fillStyle = 'rgba(255,255,255, 0.1';
  c.fillRect(0, 0, canvas.width, canvas.height);

  if (gameEntities.timer.isRunning) {
    playersAnimation();
  }
}

function playersAnimation() {
  if (debugMode.isOn) {
    getDebugInfo(gameEntities.player, gameEntities.enemy);
  }

  gameEntities.player.update();
  gameEntities.enemy.update();

  gameEntities.enemy.velocity.x = 0;
  gameEntities.player.velocity.x = 0;
  //player movements
  if (
    gameEntities.player.controls.moveLeft.pressed &&
    gameEntities.player.controls.lastPressed ===
      gameEntities.player.controls.moveLeft.value
  ) {
    gameEntities.player.switchSprite('run');
    if (gameEntities.player.position.x >= 0) {
      gameEntities.player.velocity.x = -5;
    }
  } else if (
    gameEntities.player.controls.moveRight.pressed &&
    gameEntities.player.controls.lastPressed ===
      gameEntities.player.controls.moveRight.value
  ) {
    gameEntities.player.switchSprite('run');
    if (
      gameEntities.player.position.x <=
      canvas.width - gameEntities.player.hitBox.width
    ) {
      gameEntities.player.velocity.x = 5;
    }
  } else {
    gameEntities.player.switchSprite('idle');
  }

  if (gameEntities.player.velocity.y < 0) {
    gameEntities.player.switchSprite('jump');
  }
  if (gameEntities.player.velocity.y > 0) {
    gameEntities.player.switchSprite('fall');
  }
  //enemy movement
  if (
    gameEntities.enemy.controls.moveLeft.pressed &&
    gameEntities.enemy.controls.lastPressed ===
      gameEntities.enemy.controls.moveLeft.value
  ) {
    gameEntities.enemy.switchSprite('run');
    if (gameEntities.enemy.position.x >= 0) {
      gameEntities.enemy.velocity.x = -5;
    }
  } else if (
    gameEntities.enemy.controls.moveRight.pressed &&
    gameEntities.enemy.controls.lastPressed ===
      gameEntities.enemy.controls.moveRight.value
  ) {
    gameEntities.enemy.switchSprite('run');
    if (
      gameEntities.enemy.position.x <=
      canvas.width - gameEntities.enemy.hitBox.width
    ) {
      gameEntities.enemy.velocity.x = 5;
    }
  } else {
    gameEntities.enemy.switchSprite('idle');
  }

  if (gameEntities.enemy.velocity.y < 0) {
    gameEntities.enemy.switchSprite('jump');
  }
  if (gameEntities.enemy.velocity.y > 0) {
    gameEntities.enemy.switchSprite('fall');
  }

  //collision

  //player
  if (
    rectangularCollision({
      rect1: gameEntities.player,
      rect2: gameEntities.enemy,
    }) &&
    gameEntities.player.isAttacking &&
    gameEntities.player.framesCurrent === gameEntities.player.attackFrame
  ) {
    gameEntities.enemy.takeHit(gameEntities.player.damage);
    gameEntities.player.isAttacking = false;

    if (gameEntities.enemy.health > 0) {
      document.querySelector('#enemyHealth').style.width =
        gameEntities.enemy.health + '%';
    } else {
      document.querySelector('#enemyHealth').style.width = 0;
      massage.displayMassage(gameEntities.player, gameEntities.enemy);
    }
  }

  if (
    gameEntities.player.isAttacking &&
    gameEntities.player.framesCurrent === gameEntities.player.attackFrame
  ) {
    gameEntities.player.isAttacking = false;
  }

  //enemy
  if (
    rectangularCollision({
      rect1: gameEntities.enemy,
      rect2: gameEntities.player,
    }) &&
    gameEntities.enemy.isAttacking
  ) {
    gameEntities.player.takeHit(gameEntities.enemy.damage);
    gameEntities.enemy.isAttacking = false;

    if (gameEntities.player.health > 0) {
      document.querySelector('#playerHealth').style.width =
        gameEntities.player.health + '%';
    } else {
      document.querySelector('#playerHealth').style.width = 0;
      massage.displayMassage(gameEntities.player, gameEntities.enemy);
    }
  }

  if (
    gameEntities.enemy.isAttacking &&
    gameEntities.player.framesCurrent === gameEntities.enemy.attackFrame
  ) {
    gameEntities.enemy.isAttacking = false;
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
