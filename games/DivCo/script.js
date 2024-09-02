let people = [];
let items = [];
let selectedPeopleForItem = new Set(); // Pour garder trace des personnes sélectionnées pour un article
let editingItemIndex = -1; // Index de l'article en cours d'édition

// Fonction pour afficher/masquer la popup modale d'ajout d'utilisateur
function togglePersonModal() {
    const modal = document.getElementById('personModal');
    modal.classList.toggle('hidden');
}

// Fonction pour ajouter une personne à la liste
function addPerson() {
    const personNameInput = document.getElementById('personNameInput');
    const personName = personNameInput.value.trim();
    if (personName && !people.includes(personName)) {
        people.push(personName);
        savePeopleToCookie(); // Sauvegarder la liste mise à jour
        displayPeople();
        personNameInput.value = ''; // Réinitialiser le champ de saisie
        togglePersonModal(); // Fermer la modal après ajout
    }
}

// Fonction pour afficher les personnes ajoutées
function displayPeople() {
    const peopleList = document.getElementById('peopleList');
    const peopleCheckboxes = document.getElementById('peopleCheckboxes');
    peopleList.innerHTML = '';
    peopleCheckboxes.innerHTML = '';

    people.forEach(person => {
        // Affichage des personnes ajoutées dans la liste
        peopleList.innerHTML += `
            <div>
                <p class="person-item inline mr-2">${person}</p>
                <span class="remove-btn" onclick="removePerson('${person}')"><p class="croix inline">&times;</p></span>
            </div>
        `;

        // Affichage des cases à cocher dans la popup d'ajout d'article
        peopleCheckboxes.innerHTML += `
            <div id="${person}" class="bg-primary bg-gray-200 text-gray-700 px-4 py-2 rounded-full cursor-pointer hover:bg-gray-300" onclick="togglePersonSelection('${person}')">
                ${person}
            </div>
        `;
    });
}

// Fonction pour supprimer une personne de la liste
function removePerson(person) {
    people = people.filter(p => p !== person);
    savePeopleToCookie(); // Sauvegarder la liste mise à jour
    displayPeople();
}

// Fonction pour gérer la sélection/désélection d'une personne dans la popup d'ajout d'article
function togglePersonSelection(person) {
    const personDiv = document.getElementById(person);

    if (selectedPeopleForItem.has(person)) {
        selectedPeopleForItem.delete(person);
        personDiv.classList.add('bg-gray-200');
        personDiv.classList.remove('bg-primary');
    } else {
        selectedPeopleForItem.add(person);
        personDiv.classList.remove('bg-gray-200');
        personDiv.classList.add('bg-primary');
    }
}

// Fonction pour afficher les cases à cocher des personnes dans la modale d'ajout d'article
function displayPeopleCheckboxes() {
    const peopleCheckboxes = document.getElementById('peopleCheckboxes');
    people.forEach(person => {
        const personDiv = document.getElementById(person);
        if (selectedPeopleForItem.has(person)) {
            personDiv.classList.add('bg-primary');
            personDiv.classList.remove('bg-base-200');
        } else {
            personDiv.classList.add('bg-base-200');
            personDiv.classList.remove('bg-primary');
        }
    });
}

// Fonction pour afficher/masquer la popup modale d'ajout d'article
function toggleCourseModal() {
    const modal = document.getElementById('courseModal');
    const saveButton = document.getElementById('saveItemButton');
    modal.classList.toggle('hidden');
    if (!modal.classList.contains('hidden')) {
        if (editingItemIndex !== -1) {
            populateCourseModal(items[editingItemIndex]);
            saveButton.textContent = 'Valider la modification'; // Modifier le texte du bouton pour la modification
        } else {
            resetCourseModal();
            saveButton.textContent = 'Ajouter à la liste'; // Modifier le texte du bouton pour l'ajout
        }
    }
}

// Fonction pour réinitialiser le formulaire de la modale
function resetCourseModal() {
    document.getElementById('item').value = '';
    document.getElementById('price').value = '';
    document.getElementById('quantity').value = '';
    selectedPeopleForItem.clear();
    displayPeopleCheckboxes();
}

// Fonction pour pré-remplir le formulaire de la modale pour la réédition
function populateCourseModal(item) {
    document.getElementById('item').value = item.item;
    document.getElementById('price').value = item.price;
    document.getElementById('quantity').value = item.quantity;
    selectedPeopleForItem = new Set(item.selectedPeople);
    displayPeopleCheckboxes();
}

// Fonction pour ajouter ou modifier un article dans la liste
function saveItem() {
    const itemName = document.getElementById('item').value;
    const price = parseFloat(document.getElementById('price').value);
    const quantity = parseInt(document.getElementById('quantity').value);
    const selectedPeople = Array.from(selectedPeopleForItem);

    if (selectedPeople.length === 0) {
        alert("Veuillez sélectionner au moins une personne.");
        return;
    }

    const totalPrice = price * quantity;
    const pricePerPerson = Math.ceil((totalPrice / selectedPeople.length) * 100) / 100;

    if (editingItemIndex === -1) {
        // Ajouter un nouvel article
        items.push({ item: itemName, price, quantity, selectedPeople, pricePerPerson });
    } else {
        // Modifier un article existant
        items[editingItemIndex] = { item: itemName, price, quantity, selectedPeople, pricePerPerson };
        editingItemIndex = -1; // Réinitialiser l'index après l'édition
    }

    saveItemsToCookie(); // Sauvegarder la liste mise à jour
    displayItems();
    toggleCourseModal(); // Masquer la popup après avoir ajouté/modifié l'article
}

// Fonction pour afficher les articles dans la table
function displayItems() {
    const tbody = document.querySelector('#courseTable tbody');
    tbody.innerHTML = '';

    items.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="py-2 px-4 border-b">${item.item}</td>
            <td class="py-2 px-4 border-b">${item.price.toFixed(2)} €</td>
            <td class="py-2 px-4 border-b">${item.quantity}</td>
            <td class="py-2 px-4 border-b">${item.selectedPeople.join(', ')}</td>
            <td class="py-2 px-4 border-b">${item.pricePerPerson.toFixed(2)} €</td>
            <td class="py-2 px-4 border-b">
                <button class="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600" onclick="editItem(${index})">Éditer</button>
            </td>
        `;
        tbody.appendChild(row);
    });

    calculateTotalPerPerson();
}

// Fonction pour rééditer un article
function editItem(index) {
    editingItemIndex = index;
    toggleCourseModal();
}

// Fonction pour calculer le total par personne
function calculateTotalPerPerson() {
    const totals = {};

    items.forEach(item => {
        item.selectedPeople.forEach(person => {
            if (!totals[person]) {
                totals[person] = 0;
            }
            totals[person] += item.pricePerPerson;
        });
    });

    const totalPerPersonDiv = document.getElementById('totalPerPerson');
    totalPerPersonDiv.innerHTML = '';

    for (const person in totals) {
        totalPerPersonDiv.innerHTML += `<div>${person}: ${totals[person].toFixed(2)} €</div>`;
    }
}

// Fonction pour créer un cookie
function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
}

// Fonction pour lire un cookie
function getCookie(name) {
    return document.cookie.split('; ').reduce((r, v) => {
        const parts = v.split('=');
        return parts[0] === name ? decodeURIComponent(parts[1]) : r;
    }, '');
}

// Fonction pour effacer un cookie
function deleteCookie(name) {
    setCookie(name, '', -1);
}

// Sauvegarder la liste des personnes dans un cookie
function savePeopleToCookie() {
    setCookie('people', JSON.stringify(people), 7);
}

// Sauvegarder la liste des articles dans un cookie
function saveItemsToCookie() {
    setCookie('items', JSON.stringify(items), 7);
}

function deleteAllItems() {
    if (confirm("Êtes-vous sûr de vouloir supprimer toute la liste ?")) {
        items = []; // Réinitialiser la liste des articles
        saveItemsToCookie(); // Effacer la liste sauvegardée dans les cookies
        displayItems(); // Mettre à jour l'affichage
    }
}

// Charger les données depuis les cookies au chargement de la page
window.onload = loadFromCookies;

function loadFromCookies() {
    const savedPeople = getCookie('people');
    const savedItems = getCookie('items');

    if (savedPeople) {
        people = JSON.parse(savedPeople);
    }

    if (savedItems) {
        items = JSON.parse(savedItems);
    }

    displayPeople();
    displayItems();
}
