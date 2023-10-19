const repoOwner = 'TheHubGames'; // Remplacez par le nom du propriétaire du dépôt
const repoName = 'hub_games'; // Remplacez par le nom du dépôt

const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/releases/latest`;

fetch(apiUrl)
.then(response => {
    if (!response.ok) {
        throw new Error('Erreur lors de la récupération de la dernière release depuis GitHub');
    }
    return response.json();
})
.then(data => {
    const releasesDiv = document.getElementById('github-releases');
    const md = window.markdownit();
    document.getElementById('load').style.display = 'none';

    const releaseContainer = document.createElement('div');
    releaseContainer.classList.add('release-container');

    const releaseHTML = `<div>
        <h3>${data.name}</h3>
        <p>${md.render(data.body)}</p>
    </div>`;
    releaseContainer.innerHTML = releaseHTML;

    releasesDiv.appendChild(releaseContainer);
})
.catch(error => {
    const releasesDiv = document.getElementById('github-releases');
    releasesDiv.innerHTML = '<p>Erreur lors de la récupération de la dernière release depuis GitHub</p>';
    console.error('Erreur lors de la récupération de la dernière release depuis GitHub', error);
});
