import React from "react";
import "./switch.css";

const Switch = ({ checked, handleClick, className }) => {
  return (
    <label className={`switch ${className}`}>
      <input type="checkbox" checked={checked} onChange={handleClick} />
      <span className="slider"></span>
    </label>
  );
};

export default Switch;
