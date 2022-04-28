const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

const massage = {
  displayDiv: document.querySelector('#massage'),
  win: 'You win',
  lose: 'You lose',
  tie: 'Tie',

  displayMassage(player1, player2) {
    this.displayDiv.textContent =
      player1.health > player2.health
        ? this.win
        : player2.health > player1.health
        ? this.lose
        : this.tie;
  },
};

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

const player = getFighter({ type: 'P1', skin: 'character1' });

const enemy = getFighter({ type: 'P2', skin: 'character2' });

const timer = new Timer({ duration: 99 });

showMenu('firstStart');

animate();

function animate() {
  window.requestAnimationFrame(animate);

  background.update();
  shop.update();

  c.fillStyle = 'rgba(255,255,255, 0.1';
  c.fillRect(0, 0, canvas.width, canvas.height);

  if (timer.isRunning) {
    playersAnimation();
  }
}

function playersAnimation() {
  getDebugInfo(player, enemy);

  player.update();
  enemy.update();

  enemy.velocity.x = 0;
  player.velocity.x = 0;
  //player movements
  if (
    player.controls.moveLeft.pressed &&
    player.controls.lastPressed === player.controls.moveLeft.value
  ) {
    player.switchSprite('run');
    if (player.position.x >= 0) {
      player.velocity.x = -5;
    }
  } else if (
    player.controls.moveRight.pressed &&
    player.controls.lastPressed === player.controls.moveRight.value
  ) {
    player.switchSprite('run');
    if (player.position.x <= canvas.width - player.hitBox.width) {
      player.velocity.x = 5;
    }
  } else {
    player.switchSprite('idle');
  }

  if (player.velocity.y < 0) {
    player.switchSprite('jump');
  }
  if (player.velocity.y > 0) {
    player.switchSprite('fall');
  }
  //enemy movement
  if (
    enemy.controls.moveLeft.pressed &&
    enemy.controls.lastPressed === enemy.controls.moveLeft.value
  ) {
    enemy.switchSprite('run');
    if (enemy.position.x >= 0) {
      enemy.velocity.x = -5;
    }
  } else if (
    enemy.controls.moveRight.pressed &&
    enemy.controls.lastPressed === enemy.controls.moveRight.value
  ) {
    enemy.switchSprite('run');
    if (enemy.position.x <= canvas.width - enemy.hitBox.x) {
      enemy.velocity.x = 5;
    }
  } else {
    enemy.switchSprite('idle');
  }

  if (enemy.velocity.y < 0) {
    enemy.switchSprite('jump');
  }
  if (enemy.velocity.y > 0) {
    enemy.switchSprite('fall');
  }

  //collision

  //player
  if (
    rectangularCollision({ rect1: player, rect2: enemy }) &&
    player.isAttacking &&
    player.framesCurrent === player.attackFrame
  ) {
    enemy.takeHit(player.damage);
    player.isAttacking = false;

    if (enemy.health > 0) {
      document.querySelector('#enemyHealth').style.width = enemy.health + '%';
    } else {
      document.querySelector('#enemyHealth').style.width = 0;
      massage.displayMassage(player, enemy);
    }
  }

  if (player.isAttacking && player.framesCurrent === player.attackFrame) {
    player.isAttacking = false;
  }

  //enemy
  if (
    rectangularCollision({ rect1: enemy, rect2: player }) &&
    enemy.isAttacking
  ) {
    player.takeHit(enemy.damage);
    enemy.isAttacking = false;

    if (player.health > 0) {
      document.querySelector('#playerHealth').style.width = player.health + '%';
    } else {
      document.querySelector('#playerHealth').style.width = 0;
      massage.displayMassage(player, enemy);
    }
  }

  if (enemy.isAttacking && player.framesCurrent === enemy.attackFrame) {
    enemy.isAttacking = false;
  }
}

window.addEventListener('keydown', (event) => {
  const keyCode = event.code;

  if (keyCode === 'Space') {
    showMenu('pause');
  } else if (timer.isRunning) {
    if (
      Object.values({
        left: 'KeyA',
        right: 'KeyD',
        up: 'KeyW',
        down: 'KeyS',
      }).includes(keyCode)
    ) {
      player.control(keyCode, 'keydown');
    } else if (
      Object.values({
        left: 'ArrowLeft',
        right: 'ArrowRight',
        up: 'ArrowUp',
        down: 'ArrowDown',
      }).includes(keyCode)
    ) {
      enemy.control(keyCode, 'keydown');
    }
  }
});

window.addEventListener('keyup', (event) => {
  const keyCode = event.code;

  if (keyCode === 'Space') {
    showMenu('continue');
  } else if (timer.isRunning) {
    if (
      Object.values({
        left: 'KeyA',
        right: 'KeyD',
        up: 'KeyW',
        down: 'KeyS',
      }).includes(keyCode)
    ) {
      player.control(keyCode, 'keyup');
    } else if (
      Object.values({
        left: 'ArrowLeft',
        right: 'ArrowRight',
        up: 'ArrowUp',
        down: 'ArrowDown',
      }).includes(keyCode)
    ) {
      enemy.control(keyCode, 'keyup');
    }
  }
});

document.querySelector('#timer').addEventListener('click', () => {
  showMenu('pause');
});
