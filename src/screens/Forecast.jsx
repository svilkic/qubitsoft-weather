import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ForecastCard from "../components/ForecastCard";
import Switch from "../components/Switch";
import { useSelector, useDispatch } from "react-redux";
import { addToList } from "../actions/weatherActions";
import Table from "../components/Table";
import { Bar } from "react-chartjs-2";

const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

let data1 = {
  labels: [],
  datasets: [],
};

for (var i = new Date().getDay() - 1; i < new Date().getDay() - 1 + 8; i++) {
  data1.labels.push(days[i]);
}

const options = {
  scales: {
    yAxes: [
      {
        stacked: true,
        ticks: {
          beginAtZero: true,
        },
      },
    ],
    xAxes: [
      {
        stacked: true,
      },
    ],
  },
};

const Forecast = ({ match }) => {
  const dispatch = useDispatch();

  const [weather, setWeather] = useState({ main: {}, wind: {} });
  const [forecast, setForecast] = useState({ main: {}, wind: {} });
  const [time, setTime] = useState({});
  const [isTable, setIsTable] = useState(true);

  const { toggled } = useSelector((state) => state.toggleList);
  const weatherList = useSelector((state) => state.weatherList);

  const city = match.params.city;
  const api = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=45a91daba21050d4bdf6dd758924e776`;

  const getCurrentWeather = async () => {
    const { data } = await axios.get(api);

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
    data1.datasets = dataset;
    // console.log(forecastData);
  };

  useEffect(() => {
    // if (weather.name != city) getCurrentWeather();
    if (!weather.name) getCurrentWeather();
    else {
      getForecast();
    }
  }, [dispatch, weather.coord, city]);

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
              onClick={() => setIsTable(false)}
            />
            Chart
          </label>

          <label className="btn btn-secondary">
            <input
              type="radio"
              name="options"
              autoComplete="off"
              checked={true}
              onClick={() => setIsTable(true)}
            />
            Table
          </label>
        </div>
      </div>

      {/* Chart */}

      {isTable ? (
        <Table data={forecast.daily} />
      ) : (
        <div className="card mb-5">
          <div className="card-body">
            <div className="chart">
              <Bar data={data1} width={100} height={50} options={options} />
            </div>
          </div>
        </div>
      )}

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
