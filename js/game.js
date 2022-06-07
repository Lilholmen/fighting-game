class Game {
  constructor({ player, enemy, timer, gravity, playerSkin = 1 }) {
    this.gameScenes = {
      scenes: {
        menu: { id: 0, isCurrent: true },
        fight: { id: 1, isCurrent: false },
        pause: { id: 2, isCurrent: false },
        finish: { id: 3, isCurrent: false },
      },

      get currentScene() {
        for (const scene in this.scenes) {
          if (this.scenes[scene].isCurrent) {
            return scene;
          }
        }

        console.log('State error');
        return -1;
      },

      set changeScene(name) {
        console.log(name);
        if (!this.scenes.hasOwnProperty(name)) {
          console.log('Wrong state name');
          return -1;
        }

        for (const scene in this.scenes) {
          if (state === name) {
            this.scenes[scene].isCurrent = true;
          } else if (this.scenes[scene].isCurrent) {
            this.scenes[scene].isCurrent = false;
          }
        }
      },
    };

    this.gameEntities = {
      player,
      enemy,
      timer,
    };

    this.gameRules = {
      gravity,
    };

    this.playerSkin = playerSkin;
  }
}
