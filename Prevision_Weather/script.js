document.addEventListener("DOMContentLoaded", function () {
    const weatherForm = document.getElementById("weather-form");
    const weatherData = document.getElementById("weather-info");
    const weatherScroll = document.getElementById("weather-scroll");
    const weatherDays = document.getElementById("weather-days");
    const scrollLeftButton = document.getElementById("scroll-left");
    const scrollRightButton = document.getElementById("scroll-right");
    let scrollPosition = 0; // Position actuelle du défilement
    const scrollStep = 220; // Distance de défilement à chaque clic

    // Objet pour mapper les codes d'icônes OpenWeatherMap aux URL d'images
    const weatherIcons = {
        '01d': 'url_image_soleil.png', // Ciel dégagé (jour)
        '01n': 'url_image_nuit.png', // Ciel dégagé (nuit)
        '02d': 'url_image_partiellement_nuageux_jour.png', // Quelques nuages (jour)
        '02n': 'url_image_partiellement_nuageux_nuit.png', // Quelques nuages (nuit)
        '03d': 'url_image_nuageux.png', // Nuageux
        '03n': 'url_image_nuageux.png',
        '04d': 'url_image_nuageux.png',
        '04n': 'url_image_nuageux.png',
        '09d': 'url_image_pluie_légère.png', // Pluie légère
        '09n': 'url_image_pluie_légère.png',
        '10d': 'url_image_pluie.png', // Pluie
        '10n': 'url_image_pluie.png',
        '11d': 'url_image_orage.png', // Orage
        '11n': 'url_image_orage.png',
        '13d': 'url_image_neige.png', // Neige
        '13n': 'url_image_neige.png',
        '50d': 'url_image_brouillard.png', // Brouillard
        '50n': 'url_image_brouillard.png',
    };

    weatherForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const cityName = document.getElementById("city_name").value;

        // Effectuer une requête AJAX à l'API OpenWeatherMap
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&lang=fr&appid=2dbcf398107ead0a716a4773269a7b68`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erreur ${response.status}: Impossible d'obtenir les données météorologiques pour ${cityName}.`);
                }
                return response.json();
            })
            .then(data => {
                // Traitement des données
                displayWeatherData(data);
            })
            .catch(error => {
                console.error(error.message);
                weatherData.innerHTML = `<p>${error.message}</p>`;
            });
    });

    scrollLeftButton.addEventListener("click", function () {
        // Défilement vers la gauche
        if (scrollPosition > 0) {
            scrollPosition -= scrollStep;
            weatherScroll.scrollLeft = scrollPosition;
        }
    });

    scrollRightButton.addEventListener("click", function () {
        // Défilement vers la droite
        scrollPosition += scrollStep;
        weatherScroll.scrollLeft = scrollPosition;
    });

    function displayWeatherData(data) {
        const cityName = data.city.name;
        const lon = data.city.coord.lon;
        const lat = data.city.coord.lat;

        const dailyForecasts = {};

        data.list.forEach(forecast => {
            const timestamp = forecast.dt;
            const date = formatTimestampToDate(timestamp);
            const temps = forecast.weather[0].description;
            const temperature = forecast.main.temp;
            const pression = forecast.main.pressure;
            const humidite = forecast.main.humidity;
            const vitesseVent = forecast.wind.speed;
            const niveauMer = forecast.main.sea_level || '';

            if (!dailyForecasts[date]) {
                dailyForecasts[date] = {
                    temps,
                    temperature,
                    pression,
                    humidite,
                    vitesseVent,
                    niveauMer,
                };
            }
        });

        let weatherHTML = `<h2>Coordonnée de ${cityName}</h2>`;
        let daysHTML = '';

        for (const date in dailyForecasts) {
            daysHTML += `<div class="weather-day">`;
            daysHTML += `<h3>${date}</h3>`;
            const forecast = dailyForecasts[date];
            const weatherIconCode = forecast.weather && forecast.weather.length > 0 ? forecast.weather[0].icon : '';
            const weatherIconURL = weatherIcons[weatherIconCode];

            if (weatherIconURL) {
                daysHTML += `<img class="weather-icons" src="${weatherIconURL}" alt="Météo">`;
            } else {
                daysHTML += `<p>Image non disponible</p>`;
            }

            daysHTML += `<p>Température : ${forecast.temperature}°C</p>`;
            daysHTML += `<p>Temps : ${forecast.temps}</p>`;
            daysHTML += `<p>Pression atmosphérique : ${forecast.pression} hPa</p>`;
            daysHTML += `<p>Vitesse de vent : ${forecast.vitesseVent} m/s</p>`;
            daysHTML += `<p>Niveau de la mer : ${forecast.niveauMer}</p>`;
            daysHTML += `</div>`;
        }

        weatherHTML += `<p>Longitude : ${lon}</p>`;
        weatherHTML += `<p>Latitude : ${lat}</p>`;

        weatherData.innerHTML = weatherHTML;
        weatherDays.innerHTML = daysHTML;
    }

    function formatTimestampToDate(timestamp) {
        const date = new Date(timestamp * 1000);
        const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('fr-FR', options);
    }
});
