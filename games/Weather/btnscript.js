const el = document.querySelector(".down")
let state = "normal"

if (location.pathname.match(/fullcpgrid/i) ? true : false) {
    document.documentElement.style.fontSize = "48px"
    el.style.transform = "translateX(-4rem)"

setTimeout(function() {
    el.classList.add("inprogress")
    state = "inprogress"
}, 250);
}

function downstart() {
    if (state == "finished") {
        state = "normal"
        el.classList.remove("finished")
    } else if (state == "normal") {
    state = "inprogress"
    el.classList.add("inprogress")
    }
    downloadWeatherCSV();
}

function downend() {
    if (state == "inprogress") {
        state = "finished"
        el.classList.remove("inprogress")
        el.classList.add("finished")
    }
}

function downloadWeatherCSV() {
    const cityName = document.getElementById('city-name').textContent;
    const weatherDescription = document.getElementById('weather-description').textContent;
    const temperature = document.getElementById('temperature').textContent.split(':')[1].trim();
    const pressure = document.getElementById('pressure').textContent.split(':')[1].trim();
    const humidity = document.getElementById('humidity').textContent.split(':')[1].trim();
    const windSpeed = document.getElementById('wind-speed').textContent.split(':')[1].trim();
    const longitude = document.getElementById('longitude').textContent.split(':')[1].trim();
    const latitude = document.getElementById('latitude').textContent.split(':')[1].trim();

    // Extracting the header from weatherDescription
    const header = weatherDescription.split(':')[0].trim();

    // Creating a timestamp for the file name
    const timestamp = new Date();
    const formattedTimestamp = `${timestamp.getFullYear()}${(timestamp.getMonth() + 1).toString().padStart(2, '0')}${timestamp.getDate()}_${timestamp.getHours()}${timestamp.getMinutes()}`;

    // Création du contenu CSV avec entête
    const csvContent = `${header},Temperature,Pressure,Humidity,Wind Speed,Longitude,Latitude\n${cityName},${temperature},${pressure},${humidity},${windSpeed},${longitude},${latitude}`;

    // Création d'un Blob à partir du contenu CSV
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    // Création d'un lien pour télécharger le fichier
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${cityName}_weather_data_${formattedTimestamp}.csv`;

    // Ajout du lien à la page et déclenchement du clic
    document.body.appendChild(link);
    link.click();

    // Suppression du lien de la page
    document.body.removeChild(link);
}

document.querySelector(".downprogress > div").addEventListener("transitionend", downend);