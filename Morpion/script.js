const gameBoard = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    let currentPlayer = Math.random() < 0.5 ? "X" : "O";
    let gameActive = true;
    const message = document.getElementById("message-content");
    const messageModal = document.getElementById("message-modal");
    const closeModal = document.getElementsByClassName("close")[0];
    const okButton = document.getElementById("ok-button");
    const scoreX = document.getElementById("scoreX");
    const scoreO = document.getElementById("scoreO");
    const currentPlayerElement = document.getElementById("currentPlayer");

    let winsX = 0;
    let winsO = 0;

    function returnToHub() {
    // Vous pouvez rediriger l'utilisateur vers le hub de jeu en utilisant window.location.href
    window.location.href = "index.html";
}

    function makeMove(cellIndex) {
        if (gameBoard[cellIndex] === " " && gameActive) {
            gameBoard[cellIndex] = currentPlayer;
            document.getElementsByClassName("cell")[cellIndex].textContent = currentPlayer;
            document.getElementsByClassName("cell")[cellIndex].classList.add(currentPlayer);
            checkWinner();
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            currentPlayerElement.textContent = currentPlayer;
        }
    }

    function checkWinner() {
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const combo of winningCombos) {
            const [a, b, c] = combo;
            if (gameBoard[a] !== " " && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                showMessage(`Le joueur ${gameBoard[a]} a gagné !`);
                gameActive = false;
                updateScore(gameBoard[a]);
                return;
            }
        }

        if (!gameBoard.includes(" ")) {
            showMessage("Égalité !");
            gameActive = false;
        }
    }

    function updateScore(winner) {
        if (winner === "X") {
            winsX++;
            scoreX.textContent = winsX;
        } else if (winner === "O") {
            winsO++;
            scoreO.textContent = winsO;
        }
    }

    function restartGame() {
        gameBoard.fill(" ");
        const cells = document.getElementsByClassName("cell");
        for (const cell of cells) {
            cell.textContent = "";
            cell.classList.remove("X", "O");
        }
        messageModal.style.display = "none";
        gameActive = true;

        // Génération aléatoire du joueur qui commence
        currentPlayer = Math.random() < 0.5 ? "X" : "O";
        currentPlayerElement.textContent = currentPlayer;
        messageModal.style.display = "none";
    }

    function showMessage(messageText) {
        message.textContent = messageText;
        messageModal.style.display = "block";
        if (messageText === "Égalité !" || messageText.startsWith("Le joueur")) {
            okButton.style.display = "block";
        } else {
            okButton.style.display = "none";
        }
    }

    closeModal.onclick = closeMessageModal;
    okButton.onclick = closeMessageModal;