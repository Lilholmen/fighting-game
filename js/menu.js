function showMenu(gameState) {
  const menu = document.querySelector('#menu');
  const health = document.querySelectorAll('.health-bar__value');

  switch (gameState) {
    case 'menu':
      menu.classList.remove('__display-none');

      game.gameState.changeState = gameState;
      break;
    case 'pause':
      menu.classList.remove('__display-none');

      game.gameEntities.timer.pause();
      game.gameState.changeState = gameState;
      break;
    case 'fight':
      menu.classList.add('__display-none');

      game.gameEntities.timer.continue();
      game.gameState.changeState = gameState;
      break;
    case 'finish':
      menu.classList.remove('__display-none');
      health[0].style.width = '100%';
      health[1].style.width = '100%';

      game.gameEntities.timer.end();

      massage.hideMassage();
      game.gameState.changeState = gameState;
      break;
  }
}
