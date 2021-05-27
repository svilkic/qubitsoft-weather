import { IoIosSearch } from "react-icons/io";
import { Link } from "react-router-dom";

const CitySeachInput = ({ onInput, searchResult }) => {
  return (
    <>
      <form className="d-flex justify-content-center mb-5">
        <div className="col-lg-6 col-12 input-group mb-3 p-0">
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
            onChange={onInput}
            // onKeyPress={handleSubmit}
          />
          <div
            className="col col-12 position-absolute p-0"
            style={{
              top: "2.5em",
              zIndex: "10",
              maxHeight: "300px",
              overflowY: "scroll",
            }}
          >
            {searchResult.map((c) => (
              <Link
                key={c.id}
                to={`/forecast/${c.id}`}
                className=" p-1 d-block mb-1"
                style={{ backgroundColor: "#e6e6e6" }}
              >
                {c.name}
              </Link>
            ))}
          </div>
          <button type="submit" hidden></button>
        </div>
      </form>
    </>
  );
};

export default CitySeachInput;
