let secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
let guessesSoFar = [];

// Ajoutez cette fonction pour gérer la pression de la touche "Entrée"
function handleKeyPress(event) {
  if (event.key === 'Enter') {
    checkGuess();
  }
}

// Ajoutez un écouteur d'événements pour la pression de la touche "Entrée" sur l'élément d'entrée de l'utilisateur
const userGuessInput = document.getElementById('userGuess');
userGuessInput.addEventListener('keypress', handleKeyPress);

function checkGuess() {
  const userGuess = userGuessInput.value;
  const resultElement = document.getElementById('result');
  const guessesSoFarElement = document.getElementById('guessesSoFar');
  const feedbackContainer = document.getElementById('feedback-container');
  attempts++;

  feedbackContainer.style.display='block';

  if (userGuess == secretNumber) {
    resultElement.innerHTML = `Bravo, tu as trouvé le bon nombre ${secretNumber} en ${attempts} essais.`;
    document.getElementById('resetButton').style.display = 'block';
    document.getElementById('guessButton').style.display = 'none';
    resultElement.classList.remove('incorrect');
    resultElement.classList.add('correct');
    disableInputAndButton();
  } else if (userGuess < secretNumber) {
    resultElement.innerHTML = 'Trop petit.';
    resultElement.classList.remove('correct');
    resultElement.classList.add('incorrect');
  } else {
    resultElement.innerHTML = 'Trop grand.';
    resultElement.classList.remove('correct');
    resultElement.classList.add('incorrect');
  }

  guessesSoFar.push({ guess: userGuess, result: resultElement.innerHTML });
  updateGuessesSoFar(guessesSoFarElement);
  updateFeedbackContainer(feedbackContainer);
}

function updateGuessesSoFar(element) {
  element.innerHTML = '';
  guessesSoFar.forEach(entry => {
    const listItem = document.createElement('p');
    listItem.textContent = `Nombre: ${entry.guess}, ${entry.result}`;
    element.appendChild(listItem);
  });
}

function disableInputAndButton() {
  userGuessInput.disabled = true;
  document.querySelector('button').disabled = true;
}

function updateFeedbackContainer(element) {
  const resultElement = document.getElementById('result');
  if (resultElement.classList.contains('.correct')) {
    element.style.backgroundColor = 'green';
  } else if (resultElement.classList.contains('.incorrect')) {
    element.style.backgroundColor = 'red';
  }
}

function resetGame() {
  secretNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  guessesSoFar = [];

  const userGuessInput = document.getElementById('userGuess');
  const resultElement = document.getElementById('result');
  const guessesSoFarElement = document.getElementById('guessesSoFar');
  const feedbackContainer = document.getElementById('feedback-container');
  const resetButton = document.getElementById('resetButton');
  const guessButton = document.getElementById('guessButton');

  userGuessInput.value = '';
  resultElement.innerHTML = '';
  guessesSoFarElement.innerHTML = '';
  feedbackContainer.style.backgroundColor = 'white';
  resetButton.style.display = 'none';
  feedbackContainer.style.display ='none';
  guessButton.style.display = 'block';

  userGuessInput.disabled = false;
  guessButton.disabled = false;
}
