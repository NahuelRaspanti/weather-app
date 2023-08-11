import { getWeather, searchLocation } from './weather';

const renderForecastItem = (forecast) => {
    const forecastContainer = document.querySelector('.forecast');
    
    let forecastItemsHTML = "";
    
    forecast.forEach((item) => {
        forecastItemsHTML += `
            <div class="forecast-item">
                <p class="day">${new Date(item.date).toLocaleDateString('en-US', { weekday: 'long' })}</p>
                <img src="${item.day.condition.icon}">
                <div class="forecast-temp">
                    <p>${item.day.mintemp_c}</p>
                    <p>${item.day.maxtemp_c}</p>
                </div>
            </div>
        `;
    });

    forecastContainer.innerHTML = forecastItemsHTML;
}

const renderCurrent = (current) => {

    const currentTempElem = document.querySelector('.current-temp');
    const currentDataP = document.querySelectorAll('.current-data p');
    const currentConditionImg = document.querySelector('.current-condition img');
    const currentConditionP = document.querySelector('.current-condition p');

    // Update elements' content
    currentTempElem.textContent = current.temperature;
    
    if (currentDataP.length >= 5) { // Ensure the expected number of <p> tags are present
        currentDataP[0].textContent = current.name;
        currentDataP[1].textContent = current.region;
        currentDataP[2].textContent = current.country;
        currentDataP[3].textContent = `Feels like: ${current.feelsLike}°c`;
        currentDataP[4].textContent = `Humidity: ${current.humidity}%`;
    }

    currentConditionImg.src = current.conditionIcon;
    currentConditionP.textContent = current.conditionText;
}

const renderData = (data) => {
    renderCurrent(data.current);
    renderForecastItem(data.forecast);
}

const render = async (location) => {
    document.getElementById('loader').style.visibility = 'visible';
    document.querySelector('.error').style.display = 'none';
    let data = await getWeather(location);
    if(!data.error) {
        renderData(data);
    }
    else {
        document.querySelector('.error').textContent = `Error: ${data.error}`;
        document.querySelector('.error').style.display = 'block';
    }
    document.getElementById('loader').style.visibility = 'hidden';
}

const renderSearch = async (location) => {
    const data = await searchLocation(location);
    const searchDiv = document.querySelector('.results');
    if(!data) {
        searchDiv.style.display = 'none';
        return;
    }
    
    searchDiv.innerHTML = '';
    data.forEach((search) => {
        const li = document.createElement('li');
        li.textContent = `${search.name}, ${search.region}, ${search.country}`;
        searchDiv.appendChild(li);
    })
    searchDiv.style.display = 'block';
}

export {render, renderSearch};