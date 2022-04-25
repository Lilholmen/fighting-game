class Sprite {
  constructor({ position, imageSrc, scale = 1, frames = 1 }) {
    this.position = position;
    this.height = 150;
    this.width = 50;
    this.image = new Image();
    this.image.src = imageSrc;
    this.scale = scale;
    this.frames = frames;
    this.curFrame = 0;
    this.framesElapsed = 0;
    this.framesHold = 10;
  }

  draw() {
    c.drawImage(
      this.image,
      (this.curFrame * this.image.width) / this.frames,
      0,
      this.image.width / this.frames,
      this.image.height,

      this.position.x,
      this.position.y,
      (this.image.width * this.scale) / this.frames,
      this.image.height * this.scale
    );
  }

  update() {
    this.draw();
    this.framesElapsed++;

    if (this.framesElapsed % this.framesHold === 0) {
      if (this.curFrame < this.frames - 1) {
        this.curFrame++;
      } else {
        this.curFrame = 0;
      }
    }
  }
}
