class Timer {
  constructor({ duration = 99 }) {
    this.duration = duration;
    this.guiTimer = document.querySelector('#timer');
    this.currentValue = this.duration * 10;
    this.timerId;
  }

  start() {
    this.guiTimer.textContent = this.duration;

    this.continue();
  }

  pause() {
    clearTimeout(this.timerId);
  }

  continue() {
    if (this.currentValue > 0) {
      this.timerId = setTimeout(this.continue.bind(this), 100);
      this.currentValue--;
      this.guiTimer.textContent = Math.ceil(this.currentValue / 10);
    } else {
      this.end();
    }
  }

  end() {
    clearTimeout(this.timerId);
    massage.displayMassage(player, enemy);
  }
}
