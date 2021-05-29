import React from "react";

const SwitchButtons = ({ handleSwitch, switchState }) => {
  return (
    <div className="d-flex justify-content-between align-items-center mb-3">
      <p className="m-0">Forecast for next 7 days</p>

      <div className="btn-group btn-group-toggle">
        <button
          className={`btn btn-secondary ${!switchState && "active"}`}
          onClick={() => handleSwitch(false)}
        >
          Chart
        </button>
        <button
          className={`btn btn-secondary ${switchState && "active"}`}
          onClick={() => handleSwitch(true)}
        >
          Table
        </button>
      </div>
    </div>
  );
};

export default SwitchButtons;
