let input = document.querySelector("input");
let searchBtn = document.querySelector(".search-btn");
let container = document.querySelector(".container");

const apiKey = "e859ed6794164e85aff172452252708";

searchBtn.addEventListener("click", () => {

    let city = input.value.trim();


    fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)

            // Weather Info
            let weatherInfo = document.createElement("div");
            weatherInfo.classList.add("weather-info");

            let cityName = document.createElement("h2");
            cityName.textContent = "";

            let weatherIcon = document.createElement("div");
            weatherIcon.classList.add("weather-icon");
            weatherIcon.textContent = "🌤️";

            let temperature = document.createElement("div");
            temperature.classList.add("temperature");
            temperature.textContent = "";

            let description = document.createElement("p");
            description.classList.add("description");
            description.textContent = "";

            // Extra Info

            let extraInfo = document.createElement("div");



        })

        .catch(err => console.log(err));


})