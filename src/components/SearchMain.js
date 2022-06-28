import React, { useEffect, useState } from "react";
import "../components/style.css";
import { FaSearch } from "react-icons/fa";
import WeatherDetails from "./WeatherDetails";
function SearchMain() {
  const [searchTerm, setSearchTerm] = useState("Ankara");
  const [tempInfo, setTempInfo] = useState({});
  console.log(searchTerm);
  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=metric&appid=2787bfb557cb8cc2354975d4bbcb0e36`;
      let res = await fetch(url);
      let data = await res.json();
      const { temp, humidity, pressure } = data.main;
      const { main: weatherType } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weatherType,
        name,
        speed,
        country,
        sunset,
      };

      setTempInfo(myNewWeatherInfo);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getWeatherInfo();
  }, [searchTerm]);
  return (
    <>
      <div className="wrap">
        <div className="searchBox">
          <div className="shadow"></div>
          <input
            type="search"
            placeholder="Search City"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
          <button className="searchButton" onClick={getWeatherInfo}>
            {" "}
            <FaSearch className="fa-icon" />
          </button>
        </div>
      </div>
      <WeatherDetails {...tempInfo}/>
    </>
  );
}

export default SearchMain;
