import { days } from "../extras";

const WeatherTable = ({ data }) => {
  return (
    <table className="table ">
      <thead>
        <tr>
          <td></td>
          <>
            {[0, ...Array(7)].map((x, i) => (
              <td key={i}>{days[new Date().getDay() + i]}</td>
            ))}
          </>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
          {data &&
            data.map((day, index) => (
              <td key={index}>
                <img
                  src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                />
              </td>
            ))}
        </tr>
        <tr>
          <td>Min</td>
          {data &&
            data.map((day, index) => <td key={index}>{day.temp.min}</td>)}
        </tr>
        <tr>
          <td>Max</td>
          {data &&
            data.map((day, index) => <td key={index}>{day.temp.max}</td>)}
        </tr>
        <tr>
          <td>Wind (km/h)</td>
          {data &&
            data.map((day, index) => <td key={index}>{day.wind_speed}</td>)}
        </tr>
        <tr>
          <td>Humidity (%)</td>
          {data &&
            data.map((day, index) => <td key={index}>{day.humidity}</td>)}
        </tr>
      </tbody>
    </table>
  );
};

export default WeatherTable;
