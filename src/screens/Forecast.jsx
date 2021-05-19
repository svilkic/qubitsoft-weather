import React from "react";
import { Link } from "react-router-dom";
import ForecastCard from "../components/ForecastCard";
import Switch from "../components/Switch";

const Forecast = (props) => {
  return (
    <div className="container my-3">
      {/* Basic info */}
      <div className="d-flex justify-content-between mb-5">
        <div>
          <h1>City Name</h1>
          <h6>DD-MM-YYYY HH:mm:ss</h6>
        </div>
        <div>
          <h4>Current weather details:</h4>
          <p>Temperature:</p>
          <p>Wind:</p>
          <p>Humidity:</p>
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
      <Switch className="mb-3" />

      {/* Searched Weather Forcasts  */}
      <div className="border rounded p-3 shadow">
        <div className="row">
          <ForecastCard />
          <ForecastCard />
          <ForecastCard />
        </div>
      </div>
    </div>
  );
};

export default Forecast;
