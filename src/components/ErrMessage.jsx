import React from "react";
import { Link } from "react-router-dom";

const ErrMessage = ({ error }) => {
  return (
    <div
      className=" d-flex flex-column justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <h4 className="mb-4">
        {error >= 400 && error < 500 && "City doesn't exist"}
        {error >= 500 && "Too many requests."}
      </h4>
      <div className="text-center mb-5">
        <Link to="/" className="btn btn-lg btn-primary">
          Go to home page
        </Link>
      </div>
    </div>
  );
};

export default ErrMessage;
