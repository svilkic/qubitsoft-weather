import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Switch from "../components/Switch";
import cities from "../cities.json";
import CitySearchInput from "../components/CitySearchInput";
import PreviousSearch from "../components/PreviousSearch";

const Home = () => {
  const [cityList, setCityList] = useState([]);
  const dispatch = useDispatch();
  const { toggled } = useSelector((state) => state.toggleList);
  const weatherList = useSelector((state) => state.weatherList);

  useEffect(() => {}, []);

  // const handleSubmit = (event) => {
  //   if (event.key === "Enter") {
  //     event.preventDefault();
  //     const city = event.target.value.toLowerCase();
  //     history.push(`forecast/${city}`);
  //   }
  // };

  const findCity = (e) => {
    if (e.target.value.length === 0) setCityList([]);
    else if (e.target.value.length > 3) {
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
