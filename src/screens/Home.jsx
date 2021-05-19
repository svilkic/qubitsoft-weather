import React from "react";
import { IoIosSearch } from "react-icons/io";
import Switch from "../components/Switch";
import ForecastCard from "./../components/ForecastCard";

const Home = () => {
  return (
    <div className="container pt-5">
      <div className="mt-4">
        {/* Search Input */}
        <div className="d-flex justify-content-center mb-5">
          <div className="col-lg-6 col-12 input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="search">
                <IoIosSearch />
              </span>
            </div>
            <input
              type="text"
              className="form-control shadow-sm"
              placeholder="Enter city name to get the weather forecast"
              aria-describedby="search"
            />
          </div>
        </div>

        {/* Toggle on saved search */}
        <Switch className="mb-3" />

        {/* Searched Weather Forcasts  */}
        <div className="border rounded p-3 shadow">
          <div className="row">
            <ForecastCard />
            <ForecastCard />
            <ForecastCard />
            <ForecastCard />
            <ForecastCard />
            <ForecastCard />
            <ForecastCard />
            <ForecastCard />
            <ForecastCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
