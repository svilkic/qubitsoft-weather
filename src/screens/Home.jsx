import React, { useState } from "react";
import { useSelector } from "react-redux";
import CitySearchInput from "../components/CitySearchInput";
import PreviousSearch from "../components/PreviousSearch";
import cities from "../cities.json";

const Home = () => {
  const [cityList, setCityList] = useState([]);
  const { toggled } = useSelector((state) => state.toggleList);
  const weatherList = useSelector((state) => state.weatherList);

  const findCity = (e) => {
    if (e.target.value.length === 0) setCityList([]);
    else if (e.target.value.length > 1) {
      const found = cities.filter((city) =>
        city.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setCityList(found);
    }
  };

  return (
    <div className="container pt-5">
      <div className="mt-4">
        {/* Search Input */}
        <CitySearchInput onInput={findCity} searchResult={cityList} />

        {/* Searched Weather Forcasts  */}
        <PreviousSearch toggled={toggled} searchList={weatherList} />
      </div>
    </div>
  );
};

export default Home;
