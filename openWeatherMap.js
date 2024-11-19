const baseURL = 'https://api.openweathermap.org/data/2.5/weather';

const key = '9be9ce4dd26efeac990b67592ca8e313';


const weatherForm = document.getElementById('weather-form');
const cityInput = document.getElementById('city');
const weatherResults = document.getElementById('weather-results');

weatherForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const cityName = cityInput.value; //get city name

    const url = `${baseURL}?q=${cityName}&appid=${key}&units=metric`; //celsius

    //fetch weather data from API
    fetch(url)
        .then(response => response.json()) //convert response to JSON format
        .then(data => {
            displayWeather(data); //call function to display weather data
        })
        .catch(error => {
            console.error('Error fetching weather data:', error); //error handling
            weatherResults.innerHTML = '<p>Incorrect City name.</p>';
        });
});


function displayWeather(data) {
    //clear weather results
    weatherResults.innerHTML = '';

    //check if valid weather data
    if (data && data.main) {
        //extract data
        const temperature = data.main.temp; 
        const description = data.weather[0].description;
        const city = data.name; 
        const country = data.sys.country;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;

        //create and display results
        const weatherHTML = `
            <h2>Weather in ${city}, ${country}</h2>
            <p>Temperature: ${temperature}°C</p>
            <p>Condition: ${description}</p>
            <p>Humidity: ${humidity}%</p> 
            <p>Wind Speed: ${windSpeed} m/s</p> 
        `;
        
        //insert data into weatherResults section
        weatherResults.innerHTML = weatherHTML;
    } else {
        //error handling
        weatherResults.innerHTML = '<p>Incorrect City name.</p>';
    }
}