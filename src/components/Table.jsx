const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const Table = ({ data }) => {
  return (
    <table className="table ">
      <thead>
        <tr>
          <td></td>
          <td>{days[new Date().getDay() - 1]}</td>
          <td>{days[new Date().getDay()]}</td>
          <td>{days[new Date().getDay() + 1]}</td>
          <td>{days[new Date().getDay() + 2]}</td>
          <td>{days[new Date().getDay() + 3]}</td>
          <td>{days[new Date().getDay() + 4]}</td>
          <td>{days[new Date().getDay() + 5]}</td>
          <td>{days[new Date().getDay() + 6]}</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Min</td>
          {data && data.map((day) => <td>{day.temp.min}</td>)}
        </tr>
        <tr>
          <td>Max</td>
          {data && data.map((day) => <td>{day.temp.max}</td>)}
        </tr>
        <tr>
          <td>Wind (km/h)</td>
          {data && data.map((day) => <td>{day.wind_speed}</td>)}
        </tr>
        <tr>
          <td>Humidity (%)</td>
          {data && data.map((day) => <td>{day.humidity}</td>)}
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
