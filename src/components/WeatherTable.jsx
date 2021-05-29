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

const WeatherTable = ({ data }) => {
  return (
    <table className="table ">
      <thead>
        <tr>
          <td></td>
          <>
            <td>{days[new Date().getDay() - 1]}</td>
            {[0, ...Array(6)].map((x, i) => (
              <td>{days[new Date().getDay() + i]}</td>
            ))}
          </>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
          {data &&
            data.map((day) => (
              <td>
                <img
                  src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                />
              </td>
            ))}
        </tr>
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

export default WeatherTable;
