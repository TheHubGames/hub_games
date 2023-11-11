let score = 0;
const scoreElement = document.querySelector("#score span");
const chronoElement = document.getElementById("chrono");
const forme = document.getElementById("forme");

// Fonction pour démarrer le jeu
function startGame() {
    document.getElementById("popup").style.display = "none"; // Masquer la popup
    document.getElementById("jeu").style.pointerEvents = "auto"; // Activer le jeu
    deplacerForme(); // Démarrer le jeu en déplaçant la forme initiale
    startCountdown(); // Démarrer le compte à rebours
}

// Fonction pour afficher la popup
function openPopup() {
    document.getElementById("popup").style.display = "block";
    document.getElementById("jeu").style.pointerEvents = "none"; // Désactiver le jeu
}

// Fonction pour fermer la popup
function closePopup() {
    document.getElementById("popup").style.display = "none";
}

forme.addEventListener("click", () => {
    score++;
    scoreElement.textContent = score;
    deplacerForme();
});

function deplacerForme() {
    const jeu = document.getElementById("jeu");
    const maxX = jeu.clientWidth - forme.clientWidth;
    const maxY = jeu.clientHeight - forme.clientHeight;
    const nouvelleX = Math.random() * maxX;
    const nouvelleY = Math.random() * maxY;
    forme.style.left = nouvelleX + "px";
    forme.style.top = nouvelleY + "px";
    forme.style.backgroundColor = getRandomColor();
}

function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Compte à rebours
let tempsRestant = 30;

function startCountdown() {
    const chronoInterval = setInterval(() => {
        tempsRestant--;
        chronoElement.textContent = `Chrono : ${tempsRestant}s`;
        if (tempsRestant === 0) {
            clearInterval(chronoInterval);
            alert("Temps écoulé ! Votre score final est : " + score);
            location.reload(); // Recharger la page pour recommencer
        }
    }, 1000);
}

// Afficher la popup au chargement de la page
openPopup();

function closeWarning() {
    document.getElementById('warning').style.display = 'none';
}