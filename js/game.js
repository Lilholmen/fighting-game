class Game {
  constructor({ player, enemy, timer, gravity, playerSkin = 1 }) {
    this.gameState = {
      states: {
        menu: { id: 0, isCurrent: true },
        fight: { id: 1, isCurrent: false },
        pause: { id: 2, isCurrent: false },
        finish: { id: 3, isCurrent: false },
      },

      get currentState() {
        for (const state in this.states) {
          if (this.states[state].isCurrent) {
            return state;
          }
        }

        console.log('State error');
        return -1;
      },

      set changeState(name) {
        console.log(name);
        if (!this.states.hasOwnProperty(name)) {
          console.log('Wrong state name');
          return -1;
        }

        for (const state in this.states) {
          if (state === name) {
            this.states[state].isCurrent = true;
          } else if (this.states[state].isCurrent) {
            this.states[state].isCurrent = false;
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
