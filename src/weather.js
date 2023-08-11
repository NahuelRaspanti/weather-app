const processData = (data) => {
    return {
        forecast: [...data.forecast.forecastday],
        current: {
            name: data.location.name,
            region: data.location.region,
            country: data.location.country,
            time: data.location.localtime,
            temperature: data.current.temp_c,
            feelsLike: data.current.feelslike_c,
            conditionText: data.current.condition.text,
            conditionIcon: data.current.condition.icon,
            humidity: data.current.humidity
        }
    }
}

const getWeather = async (location) => {
    const actualLocation = location ?? 'Buenos Aires';
    const api = `http://api.weatherapi.com/v1/forecast.json?key=317dce246f544657a16151528231008&q=${actualLocation}&days=7&aqi=yes`;
    try{
        const response = await fetch(api, {mode:"cors"});
        if(response.status != 200){
            return {error:"Location not found"};
        }
        const data = await response.json();
        return processData(data);
    }
    catch (e) {
        return {error:"Server error"};
    }

    
}

const searchLocation = async (location) => {
    const api = `http://api.weatherapi.com/v1/search.json?key=317dce246f544657a16151528231008&q=${location}`;
    var response = await fetch(api);
    const data = await response.json();
    return data;
}

export {getWeather, searchLocation};