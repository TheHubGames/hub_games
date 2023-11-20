const fullscreenButton = document.getElementById('fullscreenButton');
const container = document.querySelector('.container');
const tetris = document.querySelector('.tetris');
const isFullscreen = () => document.fullscreenElement !== null;

fullscreenButton.addEventListener('click', () => {

  if (document.fullscreenEnabled) {
    if (!document.fullscreenElement) {
      container.requestFullscreen().catch(err => {
        console.error('Erreur lors du passage en mode plein écran:', err);
      });
    } else {
      document.exitFullscreen();
    }
  } else {
    console.error('Le mode plein écran n\'est pas pris en charge par votre navigateur.');
  }
});

document.addEventListener('fullscreenchange', () => {
  if (isFullscreen()) {
    // Change la couleur de fond en bg-neutral quand en mode plein écran
    container.classList.add('bg-base-300');
  } else {
    // Rétablit la couleur de fond par défaut lorsque le mode plein écran est désactivé
    container.classList.remove('bg-base-300');
  }
});