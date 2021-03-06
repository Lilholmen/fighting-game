class Fighter extends Sprite {
  constructor({
    position,
    velocity,
    imageSrc,
    scale = { x: 1, y: 1 },
    frames = 1,
    offset = { x: 0, y: 0 },
    sprites,
    attackBox = { offset: {}, width: undefined, height: undefined },
    hitBox = { offset: {}, width: undefined, height: undefined },
    controls,
    attackFrame,
    spawnPosition,
  }) {
    super({
      position,
      imageSrc,
      scale,
      frames,
      offset,
    });

    this.velocity = velocity;
    this.lastKey;
    this.health = 100;
    this.damage = 15;
    this.isOnTheGround = false;
    this.isDead = false;
    this.controls = controls;
    this.attackFrame = attackFrame;
    this.spawnPosition = spawnPosition;

    this.hitBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset: hitBox.offset,
      width: hitBox.width,
      height: hitBox.height,
    };

    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset: attackBox.offset,
      width: attackBox.width,
      height: attackBox.height,
    };
    this.isAttacking;

    this.framesCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = 6;

    this.sprites = sprites;

    for (const sprite in this.sprites) {
      sprites[sprite].image = new Image();
      sprites[sprite].image.src = sprites[sprite].imageSrc;
    }
  }

  update() {
    this.draw();
    if (!this.isDead) {
      this.animateFrames();
    }

    //attackbox collision
    if (debugMode.isOn) {
      c.fillStyle = 'rgba(255,100,100,0.7)';
      c.fillRect(
        this.hitBox.position.x,
        this.hitBox.position.y,
        this.hitBox.width,
        this.hitBox.height
      );

      c.fillStyle = 'rgba(100,100,100,0.7)';
      c.fillRect(
        this.attackBox.position.x,
        this.attackBox.position.y,
        this.attackBox.width,
        this.attackBox.height
      );
    }

    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y + this.attackBox.offset.y;

    this.hitBox.position.x = this.position.x + this.hitBox.offset.x;
    this.hitBox.position.y = this.position.y + this.hitBox.offset.y;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (
      this.position.y + this.hitBox.height + this.velocity.y >=
      canvas.height - 59
    ) {
      this.velocity.y = 0;
      this.position.y = 367;
      this.isOnTheGround = true;
    } else {
      this.velocity.y += game.gameRules.gravity;
    }

    this.animate();
  }

  attack() {
    this.isAttacking = true;
    this.switchSprite('attack');
  }

  takeHit(damage) {
    this.health -= damage;

    if (this.health > 0) {
      this.switchSprite('takeHit');
    } else {
      this.switchSprite('death');
    }
  }

  animate() {
    this.velocity.x = 0;

    if (
      this.controls.moveLeft.pressed &&
      this.controls.lastPressed === this.controls.moveLeft.value
    ) {
      this.switchSprite('run');
      if (this.position.x >= 0) {
        this.velocity.x = -5;
      }
    } else if (
      this.controls.moveRight.pressed &&
      this.controls.lastPressed === this.controls.moveRight.value
    ) {
      this.switchSprite('run');
      if (this.position.x <= canvas.width - this.hitBox.width) {
        this.velocity.x = 5;
      }
    } else {
      this.switchSprite('idle');
    }

    if (this.velocity.y < 0) {
      this.switchSprite('jump');
    }
    if (this.velocity.y > 0) {
      this.switchSprite('fall');
    }
  }

  //------------------------------Controls------------------------------

  control(keyPressed, type) {
    if (type === 'keydown') {
      if (!this.isDead) {
        switch (keyPressed) {
          case this.controls.jump.value:
            if (this.velocity.y === 0) {
              this.velocity.y = -20;
            }
            break;
          case this.controls.moveLeft.value:
            this.controls.moveLeft.pressed = true;
            this.controls.lastPressed = this.controls.moveLeft.value;
            break;
          case this.controls.moveRight.value:
            this.controls.moveRight.pressed = true;
            this.controls.lastPressed = this.controls.moveRight.value;
            break;
          case this.controls.attack.value:
            this.attack();
            break;
        }
      }
    }

    if (type === 'keyup') {
      switch (keyPressed) {
        case this.controls.moveLeft.value:
          this.controls.moveLeft.pressed = false;
          break;
        case this.controls.moveRight.value:
          this.controls.moveRight.pressed = false;
          break;
      }
    }
  }

  //------------------------------Sprites------------------------------

  switchSprite(sprite) {
    if (this.image === this.sprites.death.image) {
      if (this.framesCurrent === this.sprites.death.frames - 1) {
        this.isDead = true;
      }
      return;
    }

    if (
      this.image === this.sprites.attack.image &&
      this.framesCurrent < this.sprites.attack.frames - 1
    )
      return;

    if (
      this.image === this.sprites.takeHit.image &&
      this.framesCurrent < this.sprites.takeHit.frames - 1
    )
      return;

    switch (sprite) {
      case 'idle':
        if (this.image !== this.sprites.idle.image) {
          this.image = this.sprites.idle.image;
          this.frames = this.sprites.idle.frames;
          this.framesCurrent = 0;
        }
        break;
      case 'run':
        if (this.image !== this.sprites.run.image) {
          this.image = this.sprites.run.image;
          this.frames = this.sprites.run.frames;
          this.framesCurrent = 0;
        }
        break;
      case 'jump':
        if (this.image !== this.sprites.jump.image) {
          this.image = this.sprites.jump.image;
          this.frames = this.sprites.jump.frames;
          this.framesCurrent = 0;
        }
        break;
      case 'fall':
        if (this.image !== this.sprites.fall.image) {
          this.image = this.sprites.fall.image;
          this.frames = this.sprites.fall.frames;
          this.framesCurrent = 0;
        }
        break;
      case 'attack':
        if (this.image !== this.sprites.attack.image) {
          this.image = this.sprites.attack.image;
          this.frames = this.sprites.attack.frames;
          this.framesCurrent = 0;
        }
        break;
      case 'takeHit':
        if (this.image !== this.sprites.takeHit.image) {
          this.image = this.sprites.takeHit.image;
          this.frames = this.sprites.takeHit.frames;
          this.framesCurrent = 0;
        }
        break;
      case 'death':
        if (this.image !== this.sprites.death.image) {
          this.image = this.sprites.death.image;
          this.frames = this.sprites.death.frames;
          this.framesCurrent = 0;
        }
        break;
    }
  }
}
