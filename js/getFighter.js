function getFighter({ type, skin }) {
  const fighter = {};
  const controls = {
    moveLeft: { value: keyBinds[type].left, pressed: false },
    moveRight: { value: keyBinds[type].right, pressed: false },
    jump: { value: keyBinds[type].up, pressed: false },
    attack: { value: keyBinds[type].down, pressed: false },
    lastPressed: undefined,
  };

  Object.assign(fighter, deepClone(characters[skin]), { controls });

  console.log(fighter);
  return new Fighter(fighter);
}

const keyBinds = {
  P1: { left: 'KeyA', right: 'KeyD', up: 'KeyW', down: 'KeyS' },
  P2: {
    left: 'ArrowLeft',
    right: 'ArrowRight',
    up: 'ArrowUp',
    down: 'ArrowDown',
  },
};

const characters = {
  character1: {
    position: { x: 100, y: 350 },
    velocity: { x: 0, y: 0 },
    offset: { x: 200, y: 155 },
    imageSrc: '/img/hero1/Idle.png',
    frames: 8,
    scale: { x: 2.5, y: 2.5 },
    sprites: {
      idle: { imageSrc: '/img/hero1/Idle.png', frames: 8 },
      run: { imageSrc: '/img/hero1/Run.png', frames: 8 },
      jump: { imageSrc: '/img/hero1/Jump.png', frames: 2 },
      fall: { imageSrc: '/img/hero1/Fall.png', frames: 2 },
      attack: { imageSrc: '/img/hero1/Attack1.png', frames: 6 },
      takeHit: { imageSrc: '/img/hero1/TakeHit.png', frames: 4 },
      death: { imageSrc: '/img/hero1/Death.png', frames: 6 },
    },
    attackFrame: 4,
    hitBox: {
      offset: { x: 10, y: 0 },
      width: 80,
      height: 150,
    },
    attackBox: {
      offset: { x: 54, y: -30 },
      width: 220,
      height: 170,
    },
  },

  character2: {
    position: { x: 800, y: 350 },
    velocity: { x: 0, y: 0 },
    offset: { x: 200, y: 170 },
    imageSrc: '/img/hero2/Idle.png',
    frames: 4,
    scale: { x: 2.5, y: 2.5 },
    sprites: {
      idle: { imageSrc: '/img/hero2/Idle.png', frames: 4 },
      run: { imageSrc: '/img/hero2/Run.png', frames: 8 },
      jump: { imageSrc: '/img/hero2/Jump.png', frames: 2 },
      fall: { imageSrc: '/img/hero2/Fall.png', frames: 2 },
      attack: { imageSrc: '/img/hero2/Attack1.png', frames: 4 },
      takeHit: { imageSrc: '/img/hero2/TakeHit.png', frames: 3 },
      death: { imageSrc: '/img/hero2/Death.png', frames: 7 },
    },
    attackFrame: 2,
    hitBox: {
      offset: { x: 10, y: 0 },
      width: 60,
      height: 150,
    },
    attackBox: {
      offset: { x: -158, y: 0 },
      width: 200,
      height: 145,
    },
  },

  character3: {
    position: { x: 100, y: 350 },
    velocity: { x: 0, y: 0 },
    offset: { x: 200, y: 150 },
    imageSrc: '/img/hero3/Idle.png',
    frames: 10,
    scale: { x: 3.75, y: 3.75 },
    sprites: {
      idle: { imageSrc: '/img/hero3/Idle.png', frames: 10 },
      run: { imageSrc: '/img/hero3/Run.png', frames: 10 },
      jump: { imageSrc: '/img/hero3/Jump.png', frames: 3 },
      fall: { imageSrc: '/img/hero3/Fall.png', frames: 3 },
      attack: { imageSrc: '/img/hero3/Attack1.png', frames: 6 },
      takeHit: { imageSrc: '/img/hero3/TakeHit.png', frames: 1 },
      death: { imageSrc: '/img/hero3/Death.png', frames: 10 },
    },
    attackFrame: 3,
    attackBox: {
      offset: { x: -50, y: 10 },
      width: 240,
      height: 140,
    },
  },

  character4: {
    position: { x: 100, y: 200 },
    velocity: { x: 0, y: 0 },
    offset: { x: 200, y: 161 },
    imageSrc: '/img/hero4/Idle.png',
    frames: 8,
    scale: { x: 3.2, y: 3.2 },
    sprites: {
      idle: { imageSrc: '/img/hero4/Idle.png', frames: 8 },
      run: { imageSrc: '/img/hero4/Run.png', frames: 8 },
      jump: { imageSrc: '/img/hero4/Jump.png', frames: 2 },
      fall: { imageSrc: '/img/hero4/Fall.png', frames: 2 },
      attack: { imageSrc: '/img/hero4/Attack1.png', frames: 5 },
      takeHit: { imageSrc: '/img/hero4/TakeHit.png', frames: 3 },
      death: { imageSrc: '/img/hero4/Death.png', frames: 8 },
    },
    attackFrame: 3,
    attackBox: {
      offset: { x: -16, y: -60 },
      width: 220,
      height: 190,
    },
  },

  character5: {
    position: { x: 100, y: 200 },
    velocity: { x: 0, y: 0 },
    offset: { x: 200, y: 93 },
    imageSrc: '/img/hero5/Idle.png',
    frames: 8,
    scale: { x: 3.2, y: 3.2 },
    sprites: {
      idle: { imageSrc: '/img/hero5/Idle.png', frames: 8 },
      run: { imageSrc: '/img/hero5/Run.png', frames: 8 },
      jump: { imageSrc: '/img/hero5/Jump.png', frames: 4 },
      fall: { imageSrc: '/img/hero5/Fall.png', frames: 3 },
      attack: { imageSrc: '/img/hero5/Attack1.png', frames: 14 },
      takeHit: { imageSrc: '/img/hero5/TakeHit.png', frames: 14 },
      death: { imageSrc: '/img/hero5/Death.png', frames: 24 },
    },
    attackFrame: 10,
    attackBox: {
      offset: { x: 60, y: 40 },
      width: 320,
      height: 70,
    },
  },

  character6: {
    position: { x: 100, y: 200 },
    velocity: { x: 0, y: 0 },
    offset: { x: 200, y: 134 },
    imageSrc: '/img/hero6/Idle.png',
    frames: 11,
    scale: { x: 2.5, y: 2.5 },
    sprites: {
      idle: { imageSrc: '/img/hero6/Idle.png', frames: 11 },
      run: { imageSrc: '/img/hero6/Run.png', frames: 8 },
      jump: { imageSrc: '/img/hero6/Jump.png', frames: 3 },
      fall: { imageSrc: '/img/hero6/Fall.png', frames: 3 },
      attack: { imageSrc: '/img/hero6/Attack1.png', frames: 7 },
      takeHit: { imageSrc: '/img/hero6/TakeHit.png', frames: 4 },
      death: { imageSrc: '/img/hero6/Death.png', frames: 11 },
    },
    attackFrame: 4,
    attackBox: {
      offset: { x: -23, y: -15 },
      width: 150,
      height: 160,
    },
  },

  character7: {
    position: { x: 100, y: 200 },
    with: 100,
    height: 150,
    velocity: { x: 0, y: 0 },
    offset: { x: 100, y: 75 },
    imageSrc: '/img/hero7/Idle.png',
    frames: 10,
    scale: { x: 2.75, y: 2.75 },
    sprites: {
      idle: { imageSrc: '/img/hero7/Idle.png', frames: 10 },
      run: { imageSrc: '/img/hero7/Run.png', frames: 8 },
      jump: { imageSrc: '/img/hero7/Jump.png', frames: 3 },
      fall: { imageSrc: '/img/hero7/Fall.png', frames: 3 },
      attack: { imageSrc: '/img/hero7/Attack1.png', frames: 7 },
      takeHit: { imageSrc: '/img/hero7/TakeHit.png', frames: 3 },
      death: { imageSrc: '/img/hero7/Death.png', frames: 11 },
    },
    attackFrame: 4,
    hitBox: {
      offset: { x: 20, y: 0 },
      width: 140,
      height: 150,
    },
    attackBox: {
      offset: { x: 75, y: -72 },
      width: 170,
      height: 220,
    },
  },
};
