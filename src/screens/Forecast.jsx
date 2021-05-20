import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ForecastCard from "../components/ForecastCard";
import Switch from "../components/Switch";
import { useSelector, useDispatch } from "react-redux";
import { addToList } from "../actions/weatherActions";

const Forecast = ({ match }) => {
  const dispatch = useDispatch();

  const [weather, setWeather] = useState({ main: {}, wind: {} });
  const [forecast, setForecast] = useState({ main: {}, wind: {} });
  const [time, setTime] = useState({});
  const { toggled } = useSelector((state) => state.toggleList);
  const weatherList = useSelector((state) => state.weatherList);

  const city = match.params.city;
  const api = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=45a91daba21050d4bdf6dd758924e776`;

  const getCurrentWeather = async () => {
    const { data } = await axios.get(api);
    // const data = {
    //   name: "Test",
    //   lon: 20,
    //   lat: 100,
    //   main: { temp: 18, humidity: 200 },
    //   wind: { speed: 200 },
    // };
    setWeather(data);

    console.log(data);

    const date = new Date();

    const time = {
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDay(),
      hours: date.getHours(),
      minutes: date.getMinutes(),
      seconds: date.getSeconds(),
    };
    setTime(time);
    const stringTime = printDate(time);
    // dispatch(addToList({ data, stringTime }));
  };

  // const getForecast = async () => {
  //   var { data: forecastData } = await axios.get(
  //     `https://api.openweathermap.org/data/2.5/onecall?lat=${weather.lat}&lon=${weather.lon}&exclude=minutely,hourly&units=metric&appid=45a91daba21050d4bdf6dd758924e776`
  //   );
  //   setWeather(forecastData);
  // };

  useEffect(() => {
    getCurrentWeather();
    if (weather.lat && weather.lon)
      console.log(`Lat ${weather.lat} & Lon ${weather.lon}`);
  }, [dispatch]);

  const printDate = (date) => {
    return `${date.day < 9 ? "0" : ""}${date.day}-${date.month < 9 ? "0" : ""}${
      date.month
    }-${date.year} ${date.hours < 9 ? "0" : ""}${date.hours}:${
      date.minutes < 9 ? "0" : ""
    }${date.minutes}:${date.seconds < 9 ? "0" : ""}${date.seconds}`;
  };

  return (
    <div className="container my-3">
      {/* Basic info */}
      <div className="d-flex justify-content-between mb-5">
        <div>
          <h1>{weather.name}</h1>
          <h6>{printDate(time)}</h6>
        </div>
        <div>
          <h4>Current weather details:</h4>
          <p>
            Temperature: {weather.main.temp} C (
            {(weather.main.temp * 1.8 + 21).toFixed(2)} F )
          </p>
          <p>Wind: {weather.wind.speed} km/h</p>
          <p>Humidity: {weather.main.humidity} %</p>
        </div>
      </div>

      {/* Chart | Table btn  */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <p className="m-0">Forecast for next 7 days</p>
        <div className="btn-group btn-group-toggle" data-toggle="buttons">
          <label className="btn btn-secondary active">
            <input
              type="radio"
              name="options"
              autoComplete="off"
              checked={true}
              onChange={() => console.log("Change to chart")}
            />
            Chart
          </label>

          <label className="btn btn-secondary">
            <input
              type="radio"
              name="options"
              autoComplete="off"
              onChange={() => console.log("Change to table")}
            />
            Table
          </label>
        </div>
      </div>

      {/* Chart */}
      <div className="card mb-5">
        <div className="card-body">
          <div className="chart">
            <canvas id="chart-bars" className="chart-canvas"></canvas>
          </div>
        </div>
      </div>

      <div className="text-center mb-5">
        <Link to="/" className="btn btn-lg btn-primary">
          Go to home page
        </Link>
      </div>

      {/* Toggle on saved search */}
      <Switch
        checked={toggled}
        handleClick={() => {
          dispatch({ type: "SEARCH_LIST_TOGGLE" });
        }}
        className="mb-3"
      />

      {/* Searched Weather Forcasts  */}
      {!toggled ? (
        <div className="text-center border">
          <h5 className="my-3">Currently not showing search history</h5>
        </div>
      ) : (
        <div className="border rounded p-3 shadow">
          {weatherList.length === 0 && (
            <div className="d-flex justify-content-center align-items center">
              <p className="my-5">There is no previous search.</p>
            </div>
          )}
          <div className="row">
            {weatherList.slice(0, 3).map((weather) => (
              <ForecastCard
                key={weather.data.id}
                cityName={weather.data.name}
                date={weather.stringTime}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Forecast;
