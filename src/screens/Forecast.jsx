import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addToList } from "../actions/weatherActions";
import WeatherTable from "../components/WeatherTable";
import PreviousSearch from "../components/PreviousSearch";
import SwitchButtons from "./../components/SwitchButtons";
import Spinner from "../components/Spinner";
import WeatherChart from "../components/WeatherChart";

const Forecast = ({ match }) => {
  const dispatch = useDispatch();

  const [weather, setWeather] = useState({ main: {}, wind: {} });
  const [forecast, setForecast] = useState({ main: {}, wind: {} });
  const [time, setTime] = useState({});
  const [isTable, setIsTable] = useState(true);
  const [chartData, setChartData] = useState([]);

  const { toggled } = useSelector((state) => state.toggleList);
  const weatherList = useSelector((state) => state.weatherList);

  const city = match.params.city;

  const getCurrentWeather = async () => {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?id=${city}&units=metric&appid=45a91daba21050d4bdf6dd758924e776`
    );
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
    const stringTime = formateDate(time);
    dispatch(addToList({ data, stringTime }));
  };

  const getForecast = async () => {
    var { data: forecastData } = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${weather.coord.lat}&lon=${weather.coord.lon}&exclude=minutely,hourly&units=metric&appid=45a91daba21050d4bdf6dd758924e776`
    );

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
  };

  useEffect(() => {
    if (weather.id != city) getCurrentWeather();
    if (!weather.name) getCurrentWeather();
    else {
      getForecast();
    }
  }, [dispatch, weather.coord, city]);

  const formateDate = (date) => {
    return `${date.day < 9 ? "0" : ""}${date.day}-${date.month < 9 ? "0" : ""}${
      date.month
    }-${date.year} ${date.hours < 9 ? "0" : ""}${date.hours}:${
      date.minutes < 9 ? "0" : ""
    }${date.minutes}:${date.seconds < 9 ? "0" : ""}${date.seconds}`;
  };

  return !weather.name ? (
    <Spinner />
  ) : (
    <div className="container  my-3">
      {/* Basic info */}
      <div className="d-flex justify-content-between mb-5">
        <div>
          <h1>{weather.name}</h1>
          <h6>{formateDate(time)}</h6>
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

      {isTable ? (
        <WeatherTable data={forecast.daily} />
      ) : (
        <WeatherChart data={chartData} />
      )}

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
};

export default Forecast;
