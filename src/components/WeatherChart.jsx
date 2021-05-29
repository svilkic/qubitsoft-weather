import React from "react";
import { Bar } from "react-chartjs-2";

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

const WeatherChart = ({ data }) => {
  let chartData = {
    labels: [],
    datasets: data,
  };

  const options = {
    scales: {
      yAxes: [
        {
          stacked: true,
          ticks: {
            beginAtZero: true,
          },
        },
      ],
      xAxes: [
        {
          stacked: true,
        },
      ],
    },
  };

  for (var i = new Date().getDay() - 1; i < new Date().getDay() - 1 + 8; i++) {
    chartData.labels.push(days[i]);
  }

  return (
    <div className="card mb-5">
      <div className="card-body">
        <Bar data={chartData} width={100} height={50} options={options} />
      </div>
    </div>
  );
};

export default WeatherChart;
