function showMenu(gameState) {
  const menu = document.querySelector('#menu');

  menu.style.display = 'flex';
  switch (gameState) {
    case 'firstStart':
      menu
        .querySelector('.pause__start-button')
        .addEventListener('click', () => {
          menu.style.display = 'none';
          gameEntities.timer.continue();
        });

      break;
    case 'pause':
      menu.style.display = 'flex';
      gameEntities.timer.pause();
      break;
    case 'continue':
      menu.style.display = 'none';
      gameEntities.timer.continue();
      break;
  }
}
