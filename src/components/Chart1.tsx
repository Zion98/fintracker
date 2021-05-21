import React from "react";
import { Doughnut } from "react-chartjs-2";
import { ChartOptions } from 'chart.js'
const chart = ({
  amountPending,
  amountApproved,
  amountRejected,
  amountClosed
}: any) => {
  const chartColors = [
    "#0A2342",
    "#2CA58D",
    "#84BC9C",
    "#CBA328",
    "#F46197",
    "#DBCFB0",
    "#545775",
  ];
  const data = {
    maintainAspectRatio: false,
    responsive: false,
    labels: ["pending", "approved", "rejected", "closed"],
    datasets: [
      {
        data: [
          amountPending,
          amountApproved,
          amountRejected,
          amountClosed
        ],
        backgroundColor: chartColors,
        hoverBackgroundColor: chartColors,
      },
    ],
  };
  const options: ChartOptions= {
    legend: {
      display: true,
      position: "right",
    },
    elements: {
      arc: {
        borderWidth: 1,
      },
    },
  };
  return (
    <div className="chart">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default chart;
