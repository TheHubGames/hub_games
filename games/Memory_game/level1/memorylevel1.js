
let flippedCards = [];
let cardIndices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
let emojis = ["🌟", "🍎", "🎉", "🌺", "🦄", "🐱", "🌈", "🚀"];

// Generate a random set of emojis for the game
emojis = emojis.concat(emojis);
emojis.sort(() => 0.5 - Math.random());

function createMemoryCard(index) {
    let card = document.createElement("div");
    card.className = "memory-card";
    card.setAttribute("data-index", index);
    card.setAttribute("onclick", "flipCard(this)");
    document.querySelector('.memory-game-container').appendChild(card);
}

for (let i = 0; i < cardIndices.length; i++) {
    createMemoryCard(i);
}

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
