function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12? 'PM' : 'AM';
    const timeString = hours % 12 || 12;
    return `${timeString}:${minutes < 10? '0' + minutes : minutes} ${ampm}`;
}

function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const apiKey = '36496bad1955bf3365448965a42b9eac';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

fetch(url)
  .then(response => response.json())
  .then(data => {
        document.getElementById('cityName').innerText = data.name;
        document.getElementById('weatherDescription').innerText = data.weather[0].main;
        const tempInCelsius = data.main.temp;
        const tempInFahrenheit = (tempInCelsius * 9 / 5) + 32;
        const roundedTempInFahrenheit = Math.round(tempInFahrenheit);
        document.getElementById('temperature').innerText = roundedTempInFahrenheit + '°F';
        document.getElementById('weatherIcon').src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    })
  .catch(error => {
        console.error("Error:", error);
        document.getElementById('cityName').innerText = 'Unable to retrieve location';
        document.getElementById('weatherDescription').innerText = '';
        document.getElementById('temperature').innerText = '';
    });
}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    document.getElementById('cityName').innerText = 'Unable to retrieve location';
    document.getElementById('weatherDescription').innerText = '';
    document.getElementById('temperature').innerText = '';
    document.getElementById('location').innerText = '';
}

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
} else {
    console.log("Geolocation is not supported by this browser.");
    document.getElementById('cityName').innerText = 'Geolocation not supported';
    document.getElementById('weatherDescription').innerText = '';
    document.getElementById('temperature').innerText = '';
    document.getElementById('location').innerText = '';
}

setInterval(function() {
    const currentTimeElement = document.getElementById('currentTime');
    currentTimeElement.innerText = getCurrentTime();
}, 1000);

document.addEventListener('DOMContentLoaded', function() {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = 'Mouse is hidden!';
    document.body.appendChild(notification);

    let timeout;

    function showTooltip() {
        clearTimeout(timeout);
        notification.classList.add('show');
        timeout = setTimeout(() => {
            notification.classList.remove('show');
        }, 1000);
    }

    document.addEventListener('mousemove', showTooltip);
    document.addEventListener('click', showTooltip);
});

setInterval(function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const apiKey = '36496bad1955bf3365448965a42b9eac';
            success({coords: {latitude, longitude}});
        }, err => {
            console.warn(`ERROR(${err.code}): ${err.message}`);
            document.getElementById('cityName').innerText = 'Unable to retrieve location';
            document.getElementById('weatherDescription').innerText = '';
            document.getElementById('temperature').innerText = '';
        });
    } else {
        console.log("Geolocation is not supported by this browser.");
        document.getElementById('cityName').innerText = 'Geolocation not supported';
        document.getElementById('weatherDescription').innerText = '';
        document.getElementById('temperature').innerText = '';
    }
}, 60000); 
