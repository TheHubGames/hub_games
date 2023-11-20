function fetchWeatherData() {
    const api_key = '2dbcf398107ead0a716a4773269a7b68';
    const url = 'https://api.openweathermap.org/data/2.5/weather';
    const cityInput = document.getElementById('city-input');
    const cityName = document.getElementById('city-name');
    const weatherDescription = document.getElementById('weather-description');
    const temperature = document.getElementById('temperature');
    const pressure = document.getElementById('pressure');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('wind-speed');
    const longitude = document.getElementById('longitude');
    const latitude = document.getElementById('latitude');
    const fetchButton = document.getElementById('fetch-button');
    
    function fetchData() {
        const ville = cityInput.value;
        const params = {
            'q': ville,
            'units': 'metric',
            'lang': 'fr',
            'appid': api_key
        }
        
        fetch(url + `?q=${ville}&units=metric&lang=fr&appid=${api_key}`)
            .then(response => response.json())
            .then(data => {
                cityName.textContent = ville;
                weatherDescription.textContent = `Temps : ${data.weather[0].description}`;
                temperature.textContent = `Température : ${data.main.temp}°C`;
                pressure.textContent = `Pression atmosphérique : ${data.main.pressure} hPa`;
                humidity.textContent = `Humidité : ${data.main.humidity}%`;
                windSpeed.textContent = `Vitesse de vent : ${data.wind.speed}m/s`;
                longitude.textContent = `Longitude : ${data.coord.lon}`;
                latitude.textContent = `Latitude : ${data.coord.lat}`;
            })
            .catch(error => {
                console.error("La requête a échoué avec l'erreur :", error);
            });
    }

    fetchButton.addEventListener('click', fetchData);

    cityInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            fetchData();
        }
    });
}

fetchWeatherData();
