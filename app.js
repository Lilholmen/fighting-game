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

const controlsP1 = { left: 'KeyA', right: 'KeyD', up: 'KeyW', down: 'KeyS' };
const controlsP2 = {
  left: 'ArrowLeft',
  right: 'ArrowRight',
  up: 'ArrowUp',
  down: 'ArrowDown',
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

const player = new Fighter({
  position: { x: 100, y: 350 },
  velocity: { x: 0, y: 0 },
  offset: { x: 200, y: 155 },
  imageSrc: './img/hero1/Idle.png',
  frames: 8,
  scale: { x: 2.5, y: 2.5 },
  sprites: {
    idle: { imageSrc: './img/hero1/Idle.png', frames: 8 },
    run: { imageSrc: './img/hero1/Run.png', frames: 8 },
    jump: { imageSrc: './img/hero1/Jump.png', frames: 2 },
    fall: { imageSrc: './img/hero1/Fall.png', frames: 2 },
    attack: { imageSrc: './img/hero1/Attack1.png', frames: 6 },
    takeHit: { imageSrc: './img/hero1/TakeHit.png', frames: 4 },
    death: { imageSrc: './img/hero1/Death.png', frames: 6 },
  },
  attackBox: {
    offset: { x: 73, y: 0 },
    width: 200,
    height: 120,
  },
  controls: {
    moveLeft: { value: controlsP1.left, pressed: false },
    moveRight: { value: controlsP1.right, pressed: false },
    jump: { value: controlsP1.up, pressed: false },
    attack: { value: controlsP1.down, pressed: false },
    lastPressed: undefined,
  },
});

const enemy = new Fighter({
  position: { x: 800, y: 350 },
  velocity: { x: 0, y: 0 },
  offset: { x: 200, y: 170 },
  imageSrc: './img/hero2/Idle.png',
  frames: 4,
  scale: { x: 2.5, y: 2.5 },
  sprites: {
    idle: { imageSrc: './img/hero2/Idle.png', frames: 4 },
    run: { imageSrc: './img/hero2/Run.png', frames: 8 },
    jump: { imageSrc: './img/hero2/Jump.png', frames: 2 },
    fall: { imageSrc: './img/hero2/Fall.png', frames: 2 },
    attack: { imageSrc: './img/hero2/Attack1.png', frames: 4 },
    takeHit: { imageSrc: './img/hero2/TakeHit.png', frames: 3 },
    death: { imageSrc: './img/hero2/Death.png', frames: 7 },
  },
  attackBox: {
    offset: { x: -158, y: 0 },
    width: 200,
    height: 120,
  },
  controls: {
    moveLeft: { value: controlsP2.left, pressed: false },
    moveRight: { value: controlsP2.right, pressed: false },
    jump: { value: controlsP2.up, pressed: false },
    attack: { value: controlsP2.down, pressed: false },
    lastPressed: undefined,
  },
});

const timer = new Timer({ duration: 3 });
timer.start();

animate();

function animate() {
  window.requestAnimationFrame(animate);

  background.update();
  shop.update();

  c.fillStyle = 'rgba(255,255,255, 0.1';
  c.fillRect(0, 0, canvas.width, canvas.height);

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
    if (player.position.x <= canvas.width - player.width * 2) {
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
    if (enemy.position.x <= canvas.width - enemy.width * 2) {
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
    player.framesCurrent === 4
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

  if (player.isAttacking && player.framesCurrent === 4) {
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

  if (enemy.isAttacking && player.framesCurrent === 2) {
    enemy.isAttacking = false;
  }
}

window.addEventListener('keydown', (event) => {
  const keyCode = event.code;

  if (Object.values(controlsP1).includes(keyCode)) {
    player.control(keyCode, 'keydown');
  } else if (Object.values(controlsP2).includes(keyCode)) {
    enemy.control(keyCode, 'keydown');
  } else if (keyCode === 'Space') {
    timer.pause();
  }
});

window.addEventListener('keyup', (event) => {
  const keyCode = event.code;

  if (Object.values(controlsP1).includes(keyCode)) {
    player.control(keyCode, 'keyup');
  } else if (Object.values(controlsP2).includes(keyCode)) {
    enemy.control(keyCode, 'keyup');
  } else if (keyCode === 'Space') {
    timer.continue();
  }
});

document.querySelector('#timer').addEventListener('click', () => {
  timer.pause();
});
