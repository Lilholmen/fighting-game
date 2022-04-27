const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

const timer = {
  value: 30,
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

const keys = {
  a: { pressed: false },
  d: { pressed: false },

  arrowLeft: { pressed: false },
  arrowRight: { pressed: false },
};

const background = new Sprite({
  position: { x: 0, y: 0 },
  imageSrc: './img/background.png',
});

const shop = new Sprite({
  position: { x: 570, y: 163 },
  imageSrc: './img/shop.png',
  scale: 2.75,
  frames: 6,
});

const player = new Fighter({
  position: { x: 0, y: 0 },
  velocity: { x: 0, y: 0 },
  offset: { x: 200, y: 155 },
  imageSrc: './img/hero1/Idle.png',
  frames: 8,
  scale: 2.5,
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
});

const enemy = new Fighter({
  position: { x: 400, y: 100 },
  velocity: { x: 0, y: 0 },
  offset: { x: 200, y: 170 },
  imageSrc: './img/hero2/Idle.png',
  frames: 4,
  scale: 2.5,
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

  player.update();
  enemy.update();

  enemy.velocity.x = 0;
  player.velocity.x = 0;
  //player movements
  if (keys.a.pressed && player.lastKey === 'a') {
    player.switchSprite('run');
    player.velocity.x = -5;
  } else if (keys.d.pressed && player.lastKey === 'd') {
    player.switchSprite('run');
    player.velocity.x = 5;
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
  if (keys.arrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
    enemy.switchSprite('run');
    enemy.velocity.x = -5;
  } else if (keys.arrowRight.pressed && enemy.lastKey === 'ArrowRight') {
    enemy.switchSprite('run');
    enemy.velocity.x = 5;
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
  if (!player.isDead) {
    switch (event.key) {
      case 'w':
        player.velocity.y = -20;
        break;
      case 'a':
        keys.a.pressed = true;
        player.lastKey = 'a';
        break;
      case 'd':
        keys.d.pressed = true;
        player.lastKey = 'd';
        break;
      case 's':
        player.attack();
        break;
    }
  }

  if (!enemy.isDead) {
    switch (event.key) {
      case 'ArrowUp':
        enemy.velocity.y = -20;
        break;
      case 'ArrowLeft':
        keys.arrowLeft.pressed = true;
        enemy.lastKey = 'ArrowLeft';
        break;
      case 'ArrowRight':
        keys.arrowRight.pressed = true;
        enemy.lastKey = 'ArrowRight';
        break;
      case 'ArrowDown':
        enemy.attack();
        break;
    }
  }
});

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'a':
      keys.a.pressed = false;
      break;
    case 'd':
      keys.d.pressed = false;
      break;

    case 'ArrowLeft':
      keys.arrowLeft.pressed = false;
      break;
    case 'ArrowRight':
      keys.arrowRight.pressed = false;
      break;
  }
});
