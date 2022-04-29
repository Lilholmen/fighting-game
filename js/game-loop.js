const gameState = {
  menu: { id: 0, isCurrent: true },
  fight: { id: 1, isCurrent: false },
  pause: { id: 2, isCurrent: false },
  finish: { id: 3, isCurrent: false },

  get currentState() {
    for (const state in this) {
      if (this[state].isCurrent) {
        return this[state].id;
      }
    }

    console.log('State error', this);
    return -1;
  },

  set changeState(id) {
    if (![0, 1, 2, 3].includes(id)) {
      console.log('Wrong state id');
      return -1;
    }

    for (const state in this) {
      if (this[state]?.id === id) {
        this[state].isCurrent = true;
      } else if (this[state]?.isCurrent) {
        this[state].isCurrent = false;
      }
    }
  },
};

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

const gravity = 0.7;

function gameLoop() {
  start();
}

function start() {
  gameEntities.player = getFighter({ type: 'P1', skin: 'character7' });

  gameEntities.enemy = getFighter({ type: 'P2', skin: 'enemy' });

  gameEntities.timer = new Timer({ duration: 99 });

  showMenu('firstStart');
  console.log(gameEntities);

  animate();
}
