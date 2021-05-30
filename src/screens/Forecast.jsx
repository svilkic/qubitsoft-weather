import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

import { addToList } from "../actions/weatherActions";
import WeatherTable from "../components/WeatherTable";
import PreviousSearch from "../components/PreviousSearch";
import SwitchButtons from "./../components/SwitchButtons";
import Spinner from "../components/Spinner";
import WeatherChart from "../components/WeatherChart";
import ErrMessage from "./../components/ErrMessage";

const Forecast = ({ match }) => {
  const dispatch = useDispatch();

  const [weather, setWeather] = useState({ main: {}, wind: {}, coord: {} });
  const [forecast, setForecast] = useState({ main: {}, wind: {} });
  const [time, setTime] = useState({});
  const [isTable, setIsTable] = useState(true);
  const [chartData, setChartData] = useState([]);
  const [error, setError] = useState(0);

  const { toggled } = useSelector((state) => state.toggleList);
  const weatherList = useSelector((state) => state.weatherList);

  const city = match.params.city;

  const getCurrentWeather = async () => {
    const { data } =
      (await axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?id=${city}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
        )
        .catch((err) => setError(err.response.status))) || {};
    if (data) {
      setWeather(data);

      const date = new Date();
      const time = {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds(),
      };
      setTime(time);
      const stringTime = formatDate(time);
      dispatch(addToList({ data, stringTime }));
    }
  };

  const getWeekForcast = async () => {
    var { data: forecastData } =
      (await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${weather.coord.lat}&lon=${weather.coord.lon}&exclude=minutely,hourly&units=metric&appid=${process.env.REACT_APP_API_KEY}`
      )) || {};
    if (forecastData) {
      setForecast(forecastData);
      const dataset = [
        {
          label: "Min",
          data: [],
          backgroundColor: "rgb(255, 99, 132)",
        },
        {
          label: "Max",
          data: [],
          backgroundColor: "rgb(54, 162, 235)",
        },
        {
          label: "Humidity",
          data: [],
          backgroundColor: "rgb(75, 192, 192)",
        },
        {
          label: "Wind Speed",
          data: [],
          backgroundColor: "rgb(202, 202, 12)",
        },
      ];

      forecastData.daily.forEach((element) => {
        dataset[0].data.push(element.temp.min);
        dataset[1].data.push(element.temp.max);
        dataset[2].data.push(element.humidity);
        dataset[3].data.push(element.wind_speed);
      });
      setChartData(dataset);
    }
  };

  useEffect(() => {
    if (weather.id != city) getCurrentWeather();
    if (!weather.name) getCurrentWeather();
    else {
      getWeekForcast();
    }
  }, [dispatch, weather.coord, city]);

  const formatDate = (date) => {
    return `${date.day < 9 ? "0" : ""}${date.day}-${date.month < 9 ? "0" : ""}${
      date.month
    }-${date.year} ${date.hours < 9 ? "0" : ""}${date.hours}:${
      date.minutes < 9 ? "0" : ""
    }${date.minutes}:${date.seconds < 9 ? "0" : ""}${date.seconds}`;
  };

  if (error) {
    return <ErrMessage error={error} />;
  } else if (!weather.name && error < 400) {
    return <Spinner />;
  } else {
    return (
      <div className="container my-3">
        {/* Basic info */}
        <div className="d-flex justify-content-between mb-5">
          <div>
            <h1>{weather.name}</h1>
            <h6>{formatDate(time)}</h6>
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
        <SwitchButtons handleSwitch={setIsTable} switchState={isTable} />

        {/* Chart & Table*/}
        <div className="overflow-auto">
          {isTable ? (
            <WeatherTable data={forecast.daily} />
          ) : (
            <WeatherChart data={chartData} />
          )}
        </div>

        <div className="text-center mb-5">
          <Link to="/" className="btn btn-lg btn-primary">
            Go to home page
          </Link>
        </div>

        {/* Searched Weather Forcasts  */}
        <PreviousSearch
          maxSearch={3}
          toggled={toggled}
          searchList={weatherList}
        />
      </div>
    );
  }
};

export default Forecast;
