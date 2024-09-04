import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";
import search_icon from "../assets/search.png";
import cloud_icon from "../assets/cloud.png";
import clear_icon from "../assets/clear.png";
import drizzle_icon from "../assets/drizzle.png";
import humidity_icon from "../assets/humidity.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";
function Weather() {

    const [weatherData, setWeatherData] = useState(false)

    const inpurRef = useRef()


    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,
    }

    const search = async (city) => {
        if (city === "") {
            alert("Enter City Name")
            return
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`

            const response = await fetch(url);
            const data = await response.json();

            if(!response.ok){
                alert(data.message)
                return
            }
            console.log(data);

            const icon = allIcons[data.weather[0].icon] || clear_icon;
            
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            })

        } catch (error) {
            setWeatherData(false)
            console.log(error);
        }
    }

    useEffect(() => {
      search("Karachi")
    }, [])
    

  return (
    <div className="weather rounded-lg">
      <div className="search-bar flex items-center gap-4">
        <input ref={inpurRef} type="text" placeholder="Seacrh here" className="" />
        <img className="hover:bg-gray-100" onClick={()=> search(inpurRef.current.value)} src={search_icon} alt="search icon" />
      </div>
      {weatherData?<>
      
      <img src={weatherData.icon} alt="weather" className="w-36 my-6" />
      <p className="text-white text-6xl mb-4">{weatherData.temperature}°C</p>
      <p className="text-white text-2xl font-medium">{weatherData.location}</p>
      <div className="weather_data flex justify-between w-full text-white mt-10">
        <div className="kolumn flex items-start gap-4 text-">
          <img className="w-8 mt-2" src={humidity_icon} alt="" />
          <div>
            <p className="text-lg font-medium">{weatherData.humidity} %</p>
            <span className="block">Humidity</span>
          </div>
        </div>
        <div className="kolumn flex items-start gap-4 text-">
          <img className="w-8 mt-2" src={wind_icon} alt="" />
          <div>
            <p className="text-lg font-medium">{weatherData.windSpeed} Km/h</p>
            <span className="block">Wind Speed</span>
          </div>
        </div>
      </div>
      </> : <></>}
    </div>
  );
}

export default Weather;
