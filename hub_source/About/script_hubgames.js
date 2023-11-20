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

const jobsApiUrl = "https://api.github.com/repos/thehubgames/jobs_hub_games/contributors";

fetch(jobsApiUrl)
    .then(response => response.json())
    .then(data => {
        const contributorsTable = document.getElementById("jobs_contributors_table");
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

const orgName = 'thehubgames';
const membres_apiUrl = `https://api.github.com/orgs/${orgName}/members`;

fetch(membres_apiUrl)
    .then(response => response.json())
    .then(data => {
        const membersList = document.getElementById("members_list");
        data.forEach(member => {
            const memberDiv = document.createElement("div"); // Crée une div pour chaque membre

            const avatarLink = document.createElement("a"); // Crée un élément 'a' pour chaque membre
            avatarLink.href = member.html_url; // Lien vers le profil GitHub du membre
            avatarLink.target = "_blank"; // Ouvre le lien dans un nouvel onglet

            const avatarImage = document.createElement("img");
            avatarImage.src = member.avatar_url;
            avatarImage.alt = `${member.login}'s avatar`;
            avatarImage.classList.add("w-12", "h-12", "rounded-full", "ring-2", "ring-offset-2", "ring-indigo-500");

            avatarLink.appendChild(avatarImage); // Place l'image à l'intérieur du lien
            memberDiv.appendChild(avatarLink); // Ajoute le lien avec l'image à la div du membre
            membersList.appendChild(memberDiv); // Ajoute la div du membre à la liste des membres
        });
    })
    .catch(error => console.error("Error fetching members:", error));
    