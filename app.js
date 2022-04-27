const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

const timer = {
  value: 100,
  displayDiv: document.querySelector('#timer'),

  updateTime() {
    this.displayDiv.textContent = this.value;
  },
};

const massage = {
  displayDiv: document.querySelector('#massage'),
  win: 'You win',
  lose: 'You lose',
  tie: 'Tie',

  displayMassage(player1, player2, timerId) {
    clearTimeout(timerId);

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
    moveLeft: { value: 'KeyA', pressed: false },
    moveRight: { value: 'KeyD', pressed: false },
    jump: { value: 'KeyW', pressed: false },
    attack: { value: 'KeyS', pressed: false },
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
    moveLeft: { value: 'ArrowLeft', pressed: false },
    moveRight: { value: 'ArrowRight', pressed: false },
    jump: { value: 'ArrowUp', pressed: false },
    attack: { value: 'ArrowDown', pressed: false },
    lastPressed: undefined,
  },
});

let timerId;
timer.updateTime();
decreaseTimer();

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
      massage.displayMassage(player, enemy, timerId);
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
      massage.displayMassage(player, enemy, timerId);
    }
  }

  if (enemy.isAttacking && player.framesCurrent === 2) {
    enemy.isAttacking = false;
  }
}

window.addEventListener('keydown', (event) => {
  player.control(event.code, 'keydown');
  enemy.control(event.code, 'keydown');
});

window.addEventListener('keyup', (event) => {
  player.control(event.code, 'keyup');
  enemy.control(event.code, 'keyup');
});
