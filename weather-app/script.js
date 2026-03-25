let input = document.querySelector("input");
let searchBtn = document.querySelector(".search-btn");
let container = document.querySelector(".container");

const apiKey = "YOUR_API_KEY";

searchBtn.addEventListener("click", () => {

    let city = input.value.trim();

    if (!city) {
        container.innerHTML="";
        let msg = document.createElement("h2");
        msg.textContent = "Please enter a city name";
        msg.classList.add("error-msg");
        container.appendChild(msg);
        return;
    }


    fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
        .then(res => res.json())
        .then(data => {
            // console.log(data);

            container.innerHTML = "";

            // data error

            if (data.error) {
                let errorMsg = document.createElement("h2");
                errorMsg.textContent = data.error.message;
                errorMsg.classList.add("error-msg");
                container.appendChild(errorMsg);
                input.value="";
                return;
            }

            // Weather Info
            let weatherInfo = document.createElement("div");
            weatherInfo.classList.add("weather-info");

            let cityName = document.createElement("h2");
            cityName.textContent = data.location.name + ", " + data.location.country;

            let weatherIcon = document.createElement("div");
            weatherIcon.classList.add("weather-icon");
            weatherIcon.textContent = "🌤️";

            let temperature = document.createElement("div");
            temperature.classList.add("temperature");
            temperature.textContent = data.current.temp_c + "°C";

            let description = document.createElement("p");
            description.classList.add("description");
            description.textContent = data.current.condition.text;

            weatherInfo.appendChild(cityName);
            weatherInfo.appendChild(weatherIcon);
            weatherInfo.appendChild(temperature);
            weatherInfo.appendChild(description);

            // Extra Info

            let extraInfo = document.createElement("div");
            extraInfo.classList.add("extra-info");

            let card1 = document.createElement("div");
            card1.classList.add("card1");

            let humidity = document.createElement("p");
            humidity.classList.add("text");
            humidity.textContent = "Humidity";

            let humidityValue = document.createElement("p");
            humidityValue.classList.add("text-value");
            humidityValue.textContent = data.current.humidity + "%";

            let card2 = document.createElement("div");
            card2.classList.add("card2");

            let wind = document.createElement("p");
            wind.classList.add("text");
            wind.textContent = "Wind";

            let windValue = document.createElement("p");
            windValue.classList.add("text-value");
            windValue.textContent = data.current.wind_kph + "km/h";

            let card3 = document.createElement("div");
            card3.classList.add("card3");

            let feelsLike = document.createElement("p");
            feelsLike.classList.add("text");
            feelsLike.textContent = "Feels Like";

            let feelsLikeValue = document.createElement("p");
            feelsLikeValue.classList.add("text-value");
            feelsLikeValue.textContent = data.current.feelslike_c + "°C";

            card1.appendChild(humidity);
            card1.appendChild(humidityValue);

            card2.appendChild(wind);
            card2.appendChild(windValue);

            card3.appendChild(feelsLike);
            card3.appendChild(feelsLikeValue);

            extraInfo.appendChild(card1);
            extraInfo.appendChild(card2);
            extraInfo.appendChild(card3);

            container.appendChild(weatherInfo);
            container.appendChild(extraInfo);

            input.value = "";
        })

        .catch(err => {

        container.innerHTML = "";

        let errorMsg = document.createElement("h2");
        errorMsg.textContent = "Something went wrong. Please try again.";
        errorMsg.classList.add("error-msg");

        container.appendChild(errorMsg);
    });

});