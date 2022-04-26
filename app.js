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
  //w: { pressed: false },
  a: { pressed: false },
  d: { pressed: false },

  //arrowUp: { pressed: false },
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
  offset: { x: 0, y: 0 },
  imageSrc: './img/hero1/Idle.png',
  frames: 8,
});

const enemy = new Fighter({
  position: { x: 400, y: 100 },
  velocity: { x: 0, y: 0 },
  offset: { x: -50, y: 0 },
  imageSrc: './img/hero2/Idle.png',
  frames: 4,
});

let timerId;
timer.updateTime();
decreaseTimer();

animate();

function animate() {
  window.requestAnimationFrame(animate);

  c.fillStyle = '#3e3e3e';
  c.fillRect(0, 0, canvas.width, canvas.height);

  background.update();
  shop.update();
  player.update();
  enemy.update();

  player.velocity.x = 0;
  if (keys.a.pressed && player.lastKey === 'a') {
    player.velocity.x = -5;
  } else if (keys.d.pressed && player.lastKey === 'd') {
    player.velocity.x = 5;
  }

  enemy.velocity.x = 0;
  if (keys.arrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
    enemy.velocity.x = -5;
  } else if (keys.arrowRight.pressed && enemy.lastKey === 'ArrowRight') {
    enemy.velocity.x = 5;
  }

  if (
    rectangularCollision({ rect1: player, rect2: enemy }) &&
    player.isAttacking
  ) {
    player.isAttacking = false;
    enemy.health -= player.damage;

    if (enemy.health > 0) {
      document.querySelector('#enemyHealth').style.width = enemy.health + '%';
    } else {
      document.querySelector('#enemyHealth').style.width = 0;
      massage.displayMassage(player, enemy, timerId);
    }
  }

  if (
    rectangularCollision({ rect1: enemy, rect2: player }) &&
    enemy.isAttacking
  ) {
    enemy.isAttacking = false;
    player.health -= enemy.damage;

    if (player.health > 0) {
      document.querySelector('#playerHealth').style.width = player.health + '%';
    } else {
      document.querySelector('#playerHealth').style.width = 0;
      massage.displayMassage(player, enemy, timerId);
    }
  }
}

window.addEventListener('keydown', (event) => {
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
