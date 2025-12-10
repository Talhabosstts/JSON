const API_KEY = "cc82a891e1ad8df26cc3e6622be73660";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

let unit = "metric";

const cityInput = document.getElementById("city");
const resultDiv = document.getElementById("result");
const loader = document.getElementById("loader");

/* ENTER key search */
cityInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        getWeather();
    }
});

/* Load last searched city */
window.onload = () => {
    const savedCity = localStorage.getItem("lastCity");
    if (savedCity) {
        cityInput.value = savedCity;
        getWeather();
    }
};

/* Toggle unit */
function toggleUnit() {
    unit = unit === "metric" ? "imperial" : "metric";
    if (cityInput.value.trim()) getWeather();
}

/* Get weather icon */
function getWeatherIcon(desc) {
    if (desc.includes("cloud")) return "fa-cloud";
    if (desc.includes("rain")) return "fa-cloud-rain";
    if (desc.includes("clear")) return "fa-sun";
    if (desc.includes("snow")) return "fa-snowflake";
    return "fa-smog";
}

/* Main function */
async function getWeather() {
    const city = cityInput.value.trim();

    if (!city) {
        resultDiv.innerHTML = `<p class="text-danger">❌ Please enter a city name.</p>`;
        return;
    }

    loader.classList.remove("d-none");
    resultDiv.innerHTML = "";

    try {
        const response = await fetch(
            `${BASE_URL}?q=${city}&appid=${API_KEY}&units=${unit}`
        );

        if (!response.ok) throw new Error("City not found");

        const data = await response.json();
        localStorage.setItem("lastCity", city);

        const icon = getWeatherIcon(data.weather[0].description.toLowerCase());
        const tempUnit = unit === "metric" ? "°C" : "°F";

        resultDiv.innerHTML = `
            <p class="fs-4 text-center">
                <i class="fa-solid ${icon} text-primary"></i>
            </p>
            <p><i class="fa-solid fa-location-dot text-danger"></i>
               <strong>City:</strong> ${data.name}</p>

            <p><i class="fa-solid fa-temperature-half text-warning"></i>
               <strong>Temperature:</strong> ${data.main.temp} ${tempUnit}</p>

            <p><i class="fa-solid fa-droplet text-info"></i>
               <strong>Humidity:</strong> ${data.main.humidity}%</p>

            <p><i class="fa-solid fa-wind text-secondary"></i>
               <strong>Wind:</strong> ${data.wind.speed}</p>

            <p><i class="fa-solid fa-cloud-rain text-primary"></i>
               <strong>Condition:</strong> ${data.weather[0].description}</p>
        `;
    } catch (error) {
        resultDiv.innerHTML = `
            <p class="text-danger text-center">
                ❌ City not found. Please try again.
            </p>
        `;
    } finally {
        loader.classList.add("d-none");
    }
}
