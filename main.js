
let weather = {
    apiKey: "99cd1a7debd538f3c7b19a3c645a7ec7",
    fetchWeather: function (city) {
        fetch(
            'https://api.openweathermap.org/data/2.5/weather?q=' 
            + city 
            + '&units=imperial&appid='
            + this.apiKey
        )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        const { temp_min, temp_max } = data.main;
        document.querySelector(".city").innerText = " Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = Math.floor(Math.round(temp)) + "°F";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + Math.floor(Math.round(speed)) + " mph";
        document.querySelector(".weather").classList.remove("loading");
        document.querySelector(".low").innerText = "Low: " + Math.floor(Math.round(temp_min)) + "°F ";
        document.querySelector(".high").innerText = " High: " + Math.floor(Math.round(temp_max)) + "°F";
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name +"')"
    },
    search: function() {
        this.fetchWeather(document.querySelector(".searchBar").value);
    },
};

document.querySelector(".search button").addEventListener(("click"), function () {
    weather.search();
});

document.querySelector(".searchBar").addEventListener("keyup", function(event) {
    if(event.key == "Enter"){
        weather.search();
    }
});


weather.fetchWeather();
