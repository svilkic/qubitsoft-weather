import { useDispatch } from "react-redux";
import ForecastCard from "./ForecastCard";
import Switch from "./Switch";

const PreviousSearch = ({ maxSearch = 9, toggled, searchList }) => {
  const dispatch = useDispatch();
  return (
    <>
      {/* Toggle on saved search */}
      <Switch
        checked={toggled}
        handleClick={() => {
          dispatch({ type: "SEARCH_LIST_TOGGLE" });
        }}
        className="mb-3"
      />

      {!toggled ? (
        <div className="text-center border">
          <h5 className="my-3">Currently not showing search history</h5>
        </div>
      ) : (
        <div className="border rounded p-3 shadow">
          {searchList.length === 0 && (
            <div className="d-flex justify-content-center align-items center">
              <p className="my-5">There is no previous search.</p>
            </div>
          )}
          <div className="row">
            {searchList.slice(0, maxSearch).map((weather) => (
              <ForecastCard
                key={weather.data.id}
                cityId={weather.data.id}
                cityName={weather.data.name}
                date={weather.stringTime}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default PreviousSearch;
