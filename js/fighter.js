class Fighter extends Sprite {
  constructor({ position, velocity, offset, imageSrc, scale = 1, frames = 1 }) {
    super({
      position,
      imageSrc,
      scale,
      frames,
    });

    this.velocity = velocity;
    this.height = 150;
    this.width = 50;
    this.lastKey;
    this.health = 100;
    this.damage = 15;

    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset,
      width: 100,
      height: 50,
    };
    this.isAttacking;

    this.framesCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = 5;
  }

  draw() {
    c.fillStyle = this.color;
    c.fillRect(this.position.x, this.position.y, this.width, this.height);

    if (this.isAttacking === true) {
      c.fillStyle = '#e3e3e3';
      c.fillRect(
        this.attackBox.position.x,
        this.attackBox.position.y,
        this.attackBox.width,
        this.attackBox.height
      );
    }
  }

  update() {
    this.draw();
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y >= canvas.height - 59) {
      this.velocity.y = 0;
    } else {
      this.velocity.y += gravity;
    }
  }

  attack() {
    this.isAttacking = true;

    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
  }
}
