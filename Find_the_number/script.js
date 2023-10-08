const secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
let guessesSoFar = [];

function checkGuess() {
  const userGuess = document.getElementById('userGuess').value;
  const resultElement = document.getElementById('result');
  const guessesSoFarElement = document.getElementById('guessesSoFar');
  attempts++;

  if (userGuess == secretNumber) {
    resultElement.innerHTML = `Bravo tu a trouver le bon nombre ${secretNumber} en ${attempts} essais.`;
    resultElement.style.color = 'green';
    disableInputAndButton();
  } else if (userGuess < secretNumber) {
    resultElement.innerHTML = 'Trop petit.';
    resultElement.style.color = 'red';
  } else {
    resultElement.innerHTML = 'Trop grand.';
    resultElement.style.color = 'red';
  }

  guessesSoFar.push({ guess: userGuess, result: resultElement.innerHTML });
  
  updateGuessesSoFar(guessesSoFarElement);
}

function updateGuessesSoFar(element) {
  element.innerHTML = '';
  guessesSoFar.forEach(entry => {
    const listItem = document.createElement('li');
    listItem.textContent = `Nombre: ${entry.guess}, ${entry.result}`;
    element.appendChild(listItem);
  });
}

function disableInputAndButton() {
  document.getElementById('userGuess').disabled = true;
  document.querySelector('button').disabled = true;
}
