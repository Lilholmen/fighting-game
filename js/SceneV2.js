class Scene2 {
  constructor({ fighterLeft, fighterRight, timer, background, sceneTag }) {
    this.tag = sceneTag;
    this.menu = document.querySelector('#menu');

    if (background) {
      this.background = {
        backgroundImage: background.backgroundImage,
        environment: [],

        update() {
          this.backgroundImage.update();

          for (const env of this.environment) {
            env.update();
          }
        },
      };

      for (const env of background.environment) {
        this.background.environment.push(env);
      }
    } //background

    if (fighterLeft && fighterRight) {
      this.fighters = {
        fighterLeft: fighterLeft,
        fighterRight: fighterRight,
      };
    } //fighters

    if (timer) {
      this.timer = timer;
    }

    this.onLoad = function () {
      if (sceneTag === 'menu') {
        return function () {
          menu.classList.remove('__display-none');
        };
      } else if (sceneTag === 'fight') {
        return function () {
          menu.classList.add('__display-none');
        };
      }
    };

    this.animate = function () {
      if (sceneTag === 'menu') {
        return function () {
          window.requestAnimationFrame(this.animate);

          if (debugMode.isOn) {
            getDebugInfo(this.fighters.fighterLeft, this.fighters.fighterRight);
          }

          this.background.update();

          c.fillStyle = 'rgba(255,255,255, 0.1';
          c.fillRect(0, 0, canvas.width, canvas.height);
        };
      } else if (sceneTag === 'fight') {
        return function () {
          window.requestAnimationFrame(this.animate);
          if (
            !this.fighters.fighterLeft.isDead &&
            !this.fighters.fighterRight.isDead
          ) {
            this.background.update();

            c.fillStyle = 'rgba(255,255,255, 0.1';
            c.fillRect(0, 0, canvas.width, canvas.height);

            if (this.timer.isRunning) {
              this.entities.player.update();
              this.entities.enemy.update();

              fighterCollision(this.entities.player, this.entities.enemy);
              fighterCollision(this.entities.enemy, this.entities.player);
            } else {
              this.timer.end();
              delete this.timer;
            }
          }
        };
      }
    };
  } //constructor

  start() {
    this.onLoad();

    this.animate();
  }
} //class
