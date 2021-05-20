import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import Switch from "../components/Switch";
import ForecastCard from "./../components/ForecastCard";

const Home = ({ history }) => {
  const dispatch = useDispatch();
  const { toggled } = useSelector((state) => state.toggleList);
  const weatherList = useSelector((state) => state.weatherList);

  useEffect(() => {}, []);

  const handleSubmit = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const city = event.target.value.toLowerCase();
      console.log(city);
      history.push(`forecast/${city}`);
    }
  };

  return (
    <div className="container pt-5">
      <div className="mt-4">
        {/* Search Input */}
        <form className="d-flex justify-content-center mb-5">
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
              onKeyPress={handleSubmit}
            />
            <button type="submit" hidden></button>
          </div>
        </form>

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
              {weatherList.map((weather) => (
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
    </div>
  );
};

export default Home;
