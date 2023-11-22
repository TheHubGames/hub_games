document.addEventListener("DOMContentLoaded", function () {
    const hearts = document.querySelectorAll(".heart");
    const toggleCheckbox = document.getElementById("toggle");
  
    // Fonction pour stocker les favoris dans les cookies avec une date d'expiration de 10 ans
    function setFavoritesInCookie() {
      const favorites = [];
  
      hearts.forEach((heart, index) => {
        if (heart.classList.contains("clicked")) {
          favorites.push(index);
        }
      });
  
      const expirationDate = new Date();
      expirationDate.setFullYear(expirationDate.getFullYear() + 10); // Expiration dans 10 ans
  
      document.cookie = `favorites=${JSON.stringify(favorites)}; expires=${expirationDate.toUTCString()}; path=/`;
    }
  
    // Fonction pour récupérer les favoris depuis les cookies
    function getFavoritesFromCookie() {
      const cookies = document.cookie.split(';');
      for (const cookie of cookies) {
        const [name, value] = cookie.split('=');
        if (name.trim() === 'favorites') {
          return JSON.parse(value);
        }
      }
      return [];
    }
  
    // Fonction pour stocker l'état du toggle dans les cookies avec une date d'expiration de 10 minutes
    function setToggleStateInCookie() {
      const expirationDate = new Date();
      expirationDate.setMinutes(expirationDate.getMinutes() + 10); // Expiration dans 10 minutes
  
      document.cookie = `toggleState=${toggleCheckbox.checked ? 'checked' : 'unchecked'}; expires=${expirationDate.toUTCString()}; path=/`;
    }
  
    // Fonction pour restaurer l'état du toggle depuis les cookies
    function restoreToggleStateFromCookie() {
      const cookies = document.cookie.split(';');
      for (const cookie of cookies) {
        const [name, value] = cookie.split('=');
        if (name.trim() === 'toggleState') {
          toggleCheckbox.checked = value === 'checked';
          toggleFavoritesDisplay();
          break;
        }
      }
    }
  
    // Fonction pour afficher ou masquer les favoris en fonction de l'état du toggle et des favoris sélectionnés
    function toggleFavoritesDisplay() {
      const favoritesFromCookie = getFavoritesFromCookie();
      const squares = document.querySelectorAll(".container");
      squares.forEach((container, index) => {
        const isFavorite = favoritesFromCookie.includes(index);
        if (toggleCheckbox.checked && !isFavorite) {
          container.style.display = "none";
        } else {
          container.style.display = "flex";
        }
      });
    }
  
    // Initialisation de l'état du toggle depuis les cookies
    restoreToggleStateFromCookie();
  
    // Initialisation des favoris depuis les cookies
    const favoritesFromCookie = getFavoritesFromCookie();
    favoritesFromCookie.forEach((index) => {
      if (hearts[index]) {
        hearts[index].classList.add('clicked');
      }
    });
  
    // Gestion des clics sur les cœurs
    hearts.forEach((heart, index) => {
      heart.addEventListener("click", function () {
        heart.classList.toggle("clicked");
        setFavoritesInCookie();
        toggleFavoritesDisplay();
      });
    });
  
    // Gestion du toggle pour afficher/masquer les favoris
    toggleCheckbox.addEventListener("change", function () {
      setToggleStateInCookie();
      toggleFavoritesDisplay();
    });
  
    // Affichage initial des favoris
    toggleFavoritesDisplay();
});