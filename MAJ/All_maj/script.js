document.addEventListener("DOMContentLoaded", function () {
    const repoOwner = 'TheHubGames'; // Remplacez par le nom du propriétaire du dépôt
    const repoName = 'hub_games'; // Remplacez par le nom du dépôt

    const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/releases`;

    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des releases depuis GitHub');
        }
        return response.json();
    })
    .then(data => {
        const releasesDiv = document.getElementById('github-releases');
        const md = window.markdownit();
        document.getElementById('load').style.display = 'none';
        
        data.forEach(release => {
            const releaseContainer = document.createElement('div');
            releaseContainer.classList.add('release-container');

            const releaseHTML = `<div>
                <h3>${release.name}</h3>
                <p>${md.render(release.body)}</p>
            </div>`;
            releaseContainer.innerHTML = releaseHTML;

            releasesDiv.appendChild(releaseContainer);
        });
    })
    .catch(error => {
        const releasesDiv = document.getElementById('github-releases');
        releasesDiv.innerHTML = '<p>Erreur lors de la récupération des releases depuis GitHub</p>';
        console.error('Erreur lors de la récupération des releases depuis GitHub', error);
    });
});
