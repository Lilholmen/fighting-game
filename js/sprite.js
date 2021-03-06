class Sprite {
  constructor({
    position,
    imageSrc,
    scale = { x: 1, y: 1 },
    frames = 1,
    offset = { x: 0, y: 0 },
  }) {
    this.position = position;
    this.image = new Image();
    this.image.src = imageSrc;
    this.scale = scale;
    this.frames = frames;
    this.offset = offset;

    this.framesCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = 5;
  }

  draw() {
    c.drawImage(
      this.image,
      (this.framesCurrent * this.image.width) / this.frames,
      0,
      this.image.width / this.frames,
      this.image.height,

      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      (this.image.width * this.scale.x) / this.frames,
      this.image.height * this.scale.y
    );
  }

  animateFrames() {
    this.framesElapsed++;

    if (this.framesElapsed % this.framesHold === 0) {
      if (this.framesCurrent < this.frames - 1) {
        this.framesCurrent++;
      } else {
        this.framesCurrent = 0;
      }
    }
  }

  update() {
    this.draw();
    this.animateFrames();
  }
}
