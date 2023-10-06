// Code JavaScript pour récupérer les contributeurs GitHub et leurs contributions
const apiUrl = "https://api.github.com/repos/Klaynight-dev/hub_games/contributors";

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const contributorsTable = document.getElementById("contributors");
        data.forEach(contributor => {
            const row = contributorsTable.insertRow();
            const nameCell = row.insertCell(0);
            const prContributionsCell = row.insertCell(1);
            const issueContributionsCell = row.insertCell(2);

            // Création d'un lien vers le profil GitHub du contributeur
            const contributorLink = document.createElement("a");
            contributorLink.href = contributor.html_url;
            contributorLink.textContent = contributor.login;
            contributorLink.target = "blank";

            nameCell.appendChild(contributorLink);
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