let cardIndices = [...Array(45).keys()]; // Crée un tableau de 0 à 44 (9x5 = 45 cartes)
let emojis = ["🌟", "🍎", "🎉", "🌺", "🦄", "🐱", "🌈", "🚀", "🍕", "🎸", "📚", "🎩", "🌸", "🚲", "🎮", "🎳", "🎲", "🎺", "🎤", "🚗", "🎂", "🍦", "🎁", "🚢", "🎸", "🎡", "🎠", "🚤", "🚁", "🚂", "🚒", "🚕", "🚑", "🚓", "🚜", "🚚", "🚛", "🚔", "🚍", "🚘", "🚃", "🛵", "🚄", "🚆", "🛴", "🚇", "🚈", "🚊", "🚝"];

emojis = emojis.concat(emojis);
emojis.sort(() => 0.5 - Math.random());

let gridSizeX = 9; // Largeur de la grille
let gridSizeY = 5; // Hauteur de la grille

function createMemoryCard(index) {
    let card = document.createElement("div");
    card.className = "memory-card";
    card.setAttribute("data-index", index);
    card.setAttribute("onclick", "flipCard(this)");
    document.querySelector('.memory-game-container').appendChild(card);
}

for (let i = 0; i < gridSizeY; i++) {
    for (let j = 0; j < gridSizeX; j++) {
        let index = i * gridSizeX + j;
        createMemoryCard(index);
    }
}

let flippedCards = [];

function flipCard(card) {
    let index = card.getAttribute("data-index");

    if (flippedCards.length < 2 && !flippedCards.includes(index)) {
        flippedCards.push(index);
        card.textContent = emojis[index];
        card.classList.add('flipped');
    }

    if (flippedCards.length === 2) {
        setTimeout(checkMatch, 1000);
    }
}

function checkMatch() {
    const [firstIndex, secondIndex] = flippedCards;

    if (emojis[firstIndex] === emojis[secondIndex]) {
        document.querySelector(`[data-index="${firstIndex}"]`).classList.add('matched');
        document.querySelector(`[data-index="${secondIndex}"]`).classList.add('matched');
    } else {
        document.querySelector(`[data-index="${firstIndex}"]`).classList.remove('flipped');
        document.querySelector(`[data-index="${secondIndex}"]`).classList.remove('flipped');
        document.querySelector(`[data-index="${firstIndex}"]`).textContent = '';
        document.querySelector(`[data-index="${secondIndex}"]`).textContent = '';
    }

    flippedCards = [];
}
