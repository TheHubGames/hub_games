function returnToHub() {
    // Vous pouvez rediriger l'utilisateur vers le hub de jeu en utilisant window.location.href
        window.location.href = "index.html";
}
    let clicks = 0;
    let countdown = 15;
    let countdownStarted = false;

    const clickButton = document.getElementById("click-button");
    const clickCount = document.getElementById("click-count");
    const countdownDisplay = document.getElementById("countdown");
    const cpsResult = document.getElementById("cps-result"); // Élément pour afficher le résultat
    const retryButton = document.getElementById("retry-button"); // Bouton de retest
    const histCPS = document.getElementById("cps-history")

clickButton.addEventListener("click", () => {
    if (!countdownStarted) {
        countdownStarted = true;
        countdownDisplay.textContent = `Temps restant: ${countdown} secondes`;
        startCountdown();
    }

    clicks++;
    clickCount.textContent = `${clicks} clics`;
});

function startCountdown() {
    const countdownInterval = setInterval(() => {
        countdown--;
        countdownDisplay.textContent = `Temps restant: ${countdown} secondes`;

        if (countdown === 0) {
            clearInterval(countdownInterval);
            // Afficher le résultat du nombre de clics divisé par 15
            const result = (clicks / 15).toFixed(2);
            cpsResult.textContent = `CPS: ${result}`;
            cpsResult.style.display = "block"; // Rendre l'élément visible

            // Obtenir la date et l'heure actuelles au format "dd/mm/aaaa hh:mm"
            const currentDate = new Date();
            const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getFullYear()} ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}`;

            // Ajouter le résultat CPS et la date/heure à l'historique
            const listItem = document.createElement("li");
            listItem.textContent = `${formattedDate} - CPS: ${result}`;
            histCPS.appendChild(listItem);

            // Masquer le temps après les 15 secondes
            countdownDisplay.style.display = "none";

            // Masquer le bouton "Cliquez ici!" après les 15 secondes
            clickButton.style.display = "none";

            // Afficher le bouton "Refaire un test"
            retryButton.style.display = "block";
        }
    }, 1000);
}


retryButton.addEventListener("click", () => {
    clicks = 0;
    countdown = 15;
    countdownStarted = false;
    cpsResult.style.display = "none";

    // Afficher à nouveau le temps lorsque vous cliquez sur "Refaire un test"
    countdownDisplay.style.display = "block";

    // Afficher à nouveau le bouton "Cliquez ici!" lorsque vous cliquez sur "Refaire un test"
    clickButton.style.display = "block";

    retryButton.style.display = "none";
    clickCount.textContent = "0 clics";
    countdownDisplay.textContent = "Attendez de cliquer...";
});
