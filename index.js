const apiKey = "cc82a891e1ad8df26cc3e6622be73660";

async function getweather() {

    let city = document.getElementById("city").value

    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    let data = await response.json();


    let weatherDiv = document.getElementById("result")

   weatherDiv.innerHTML = `
    <p><i class="fa-solid fa-location-dot text-danger"></i> 
       <strong>City:${data.name}</strong> 
    </p>

    <p><i class="fa-solid fa-temperature-half text-warning"></i> 
       <strong>Temp:${data.main.temp} °C </strong>
    </p>
    <p><i class="fa-solid fa-droplet text-info"></i>
    <strong>Humidity: ${data.main.humidity}</strong>
    </p>
    <p><i class="fa-solid fa-cloud-sun"></i>
    <strong>clouds: ${data.clouds.all}</strong>
    </p>

    <p><i class="fa-solid fa-wind text-info"></i> 
       <strong>Wind: ${data.wind.speed} m/s </strong>
    </p>

    <p><i class="fa-solid fa-cloud text-secondary"></i> 
       <strong>Weather: ${data.weather[0].description}</strong>
    </p>
`;


}