import React from "react";
import "./switch.css";

const Switch = ({ className }) => {
  return (
    <label className={`switch ${className}`}>
      <input type="checkbox" />
      <span className="slider"></span>
    </label>
  );
};

export default Switch;
