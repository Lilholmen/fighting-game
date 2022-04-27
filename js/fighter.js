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
    controls,
  }) {
    super({
      position,
      imageSrc,
      scale,
      frames,
      offset,
    });

    this.velocity = velocity;
    this.height = 150;
    this.width = 50;
    this.lastKey;
    this.health = 100;
    this.damage = 15;
    this.isOnTheGround = false;
    this.isDead = false;
    this.controls = controls;

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
    this.framesHold = 5;

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

    //attackbox
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y + this.attackBox.offset.y;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y >= canvas.height - 59) {
      this.velocity.y = 0;
      this.position.y = 367;
      this.isOnTheGround = true;
    } else {
      this.velocity.y += gravity;
    }
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
