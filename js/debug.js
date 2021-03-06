const debugMode = {
  isOn: false,
  htmlElement: document.querySelector('.debug'),

  switcher() {
    this.isOn = !this.isOn;

    this.isOn
      ? this.htmlElement.classList.remove('__display-none')
      : this.htmlElement.classList.add('__display-none');
  },
};

function getDebugInfo(p1, p2) {
  document.querySelector('#game-state').textContent =
    game.gameState.currentState;

  document.querySelector('#player-position').textContent = cordToXY(
    p1.position
  );
  document.querySelector('#player-velocity').textContent = cordToXY(
    p1.velocity
  );
  document.querySelector('#player-health').textContent = p1.health;

  document.querySelector('#enemy-position').textContent = cordToXY(p2.position);
  document.querySelector('#enemy-velocity').textContent = cordToXY(p2.velocity);
  document.querySelector('#enemy-health').textContent = p2.health;
}

function cordToXY(cords) {
  return `x: ${cords.x}; y: ${cords.y}`;
}

window.addEventListener('keydown', (event) => {
  console.log(
    event.key,
    event.keyCode,
    event.code,
    game.gameEntities.timer.currentValue
  );
});
