document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "0f0a25d79143b5c28e681db338262633"; // Replace with your actual API key
    const searchButton = document.getElementById("search");
    const locationInput = document.getElementById("location");
    const cityElement = document.getElementById("city");
    const weatherInfoElement = document.getElementById("weather-info");

    searchButton.addEventListener("click", () => {
        const location = locationInput.value.trim();
        if (location !== "") {
            fetchWeather(location, apiKey);
        }
    });

    function fetchWeather(location, apiKey) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                displayWeather(data);
            })
            .catch((error) => {
                console.error("Error fetching weather data:", error);
                weatherInfoElement.innerHTML = "Could not fetch weather data. Please try again later.";
            });
    }

    function displayWeather(data) {
        cityElement.textContent = data.name;
        const temperature = data.main.temp;
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;

        weatherInfoElement.innerHTML = `
            <p>Temperature: ${temperature}°C</p>
            <p>Weather: ${description}</p>
            <img src="https://openweathermap.org/img/w/${icon}.png" alt="${description}">
        `;
    }
});
