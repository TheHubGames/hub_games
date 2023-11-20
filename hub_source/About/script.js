const apiUrl = "https://api.github.com/repos/thehubgames/hub_games/contributors";

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const contributorsTable = document.getElementById("contributors_table");
        data.forEach(contributor => {
            const row = contributorsTable.insertRow();
            const cell = row.insertCell(0);
            cell.classList.add("flex", "items-center"); // Utilisation de flexbox pour aligner l'image et le lien

            // Création de l'élément image pour la photo de profil
            const avatarImage = document.createElement("img");
            avatarImage.src = contributor.avatar_url;
            avatarImage.alt = `${contributor.login}'s avatar`;
            avatarImage.classList.add("h-10", "w-10", "rounded-full", "mr-1", 'm-1'); // Espacement à droite du cercle

            // Création d'un lien vers le profil GitHub du contributeur
            const contributorLink = document.createElement("a");
            contributorLink.href = contributor.html_url;
            contributorLink.textContent = contributor.login;
            contributorLink.target = "_blank";

            // Ajout de l'image et du lien dans la même cellule
            cell.appendChild(avatarImage);
            cell.appendChild(contributorLink);

            const prContributionsCell = row.insertCell(1);
            const issueContributionsCell = row.insertCell(2);

            prContributionsCell.textContent = contributor.contributions;

            // Récupération du nombre de contributions aux issues
            fetch(`https://api.github.com/users/${contributor.login}/repos?type=all&sort=updated`)
                .then(response => response.json())
                .then(repos => {
                    let issueContributions = 0;
                    repos.forEach(repo => {
                        issueContributions += repo.open_issues_count;
                    });
                    issueContributionsCell.textContent = issueContributions;
                })
                .catch(error => console.error(`Erreur lors de la récupération des contributions aux issues pour ${contributor.login}: ${error}`));
        });
    })
    .catch(error => console.error("Erreur lors de la récupération des contributeurs :", error));
