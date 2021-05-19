import React from "react";
import { IoLogoRss } from "react-icons/io";
import { Link } from "react-router-dom";
const ForecastCard = (props) => {
  return (
    <Link
      to="/forecast"
      className="forecast-card  col col-lg-4 col-md-6 col-sm-12 col-12 my-3"
    >
      <div className="p-2 border rounded shadow-sm">
        <h4>City name</h4>
        <p className="text-muted">Checked on DD-MM-YYYY HH-mm</p>
        <div className="d-flex justify-content-end">
          <IoLogoRss className="flip text-muted" />
        </div>
      </div>
    </Link>
  );
};

export default ForecastCard;
