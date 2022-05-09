class Scene {
  constructor({ enteties, timer, background, sceneName, menuSelector }) {
    this.sceneName = sceneName;

    this.enteties = {
      player: enteties.player,
      enemy: enteties.enemy,
    };

    this.timer = timer;
    this.menu = menuSelector;

    this.background = {
      bgImg: background.bgImg,
      environment: [],

      updateBackground() {
        this.bgImg.update();

        for (const env of this.environment) {
          env.update();
        }
      },
    };

    for (const env of background.environment) {
      this.background.environment.push(env);
    }

    switch (sceneName) {
      case 'fight':
        this.animate = function () {
          if (!this.entities.player.isDead && !this.entitis.enemy.isDead) {
            window.requestAnimationFrame(this.animate);

            if (debugMode.isOn) {
              getDebugInfo(this.entities.player, this.entities.enemy);
            }

            this.background.updateBackground();

            c.fillStyle = 'rgba(255,255,255, 0.1';
            c.fillRect(0, 0, canvas.width, canvas.height);

            if (this.timer.isRunning) {
              this.entities.player.update();
              this.entities.enemy.update();

              fighterCollision(this.entities.player, this.entities.enemy);
              fighterCollision(this.entities.enemy, this.entities.player);
            }
          } else {
            this.timer.end();
            delete this.timer;
          }
        };
        break;

      case 'menu':
        this.animate = function () {
          menu.classList.remove('__display-none');
        };
        break;
    }
  }
}
