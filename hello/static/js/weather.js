
let lat, long;
const key = "1e8ea9579266cf1f095662ba50afb91a";

// Show Weather
function showWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            lat = position.coords.latitude;
            long = position.coords.longitude;
            //console.log(lat + " " + long);
            fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=" + key)
                .then(function (resp) { return resp.json() })
                .then(function (data) {
                    drawWeather(data);
                })
                .catch(function () {
                    console.log("Fetch weather error!");
                })
        }, function error(err) {
            console.warn('ERROR(' + err.code + '): ' + err.message);
            fetch("https://api.openweathermap.org/data/2.5/weather?q=Luxembourg&appid=" + key)
                .then(function (resp) { return resp.json() })
                .then(function (data) {
                    drawWeather(data);
                })
                .catch(function () {
                    //console.log("Fetch weather error!");
                })
        })
    }
};

function drawWeather(d) {
    let celcius = Math.round(parseFloat(d.main.temp) - 273.15);
    let fahrenheit = Math.round(((parseFloat(d.main.temp) - 273.15) * 1.8) + 32);
    let description = d.weather[0].description;

    document.getElementById('temp-description').innerHTML = description;
    document.getElementById('temp-degree').innerHTML = celcius + '&deg;C/' + fahrenheit + '&deg;F';
    document.getElementById('location').innerHTML = d.sys.country + ", " + d.name;

    if (description.indexOf('rain') > 0) {
        document.body.className = 'rainy';
    } else if (description.indexOf('cloud') > 0) {
        document.body.className = 'cloudy';
    } else if (description.indexOf('sunny') > 0) {
        document.body.className = 'sunny';
    } else {
        document.body.className = 'clear';
    }

    getIcon(d.weather[0].icon);
};

function getIcon(iconID) {
    let skycons = new Skycons({
      "color": "white"
    });
    if (iconID === "01d") {
      skycons.set("icon1", "clear-day");
    } else if (iconID === "01n") {
      skycons.set("icon1", "clear-night");
    } else if (iconID === "02d") {
      skycons.set("icon1", "partly-cloudy-day");
    } else if (iconID === "02n") {
      skycons.set("icon1", "partly-cloudy-night");
    } else if (iconID === "03d" || iconID === "03n" || iconID === "04d" || iconID === "04n") {
      skycons.set("icon1", "cloudy");
    } else if (iconID === "09d" || iconID === "09n") {
      skycons.set("icon1", "rain");
    } else if (iconID === "10d" || iconID === "10n" || iconID === "11d" || iconID === "11n") {
      skycons.set("icon1", "sleet");
    } else if (iconID === "13d" || iconID === "13n") {
      skycons.set("icon1", "snow");
    } else {
      skycons.set("icon1", "fog");
    };
    skycons.play();
  };

// Run
showWeather();
