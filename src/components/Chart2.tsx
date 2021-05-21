import React from "react";
import { Doughnut } from "react-chartjs-2";
import { ChartOptions } from 'chart.js'
const chart = ({
    loan,
    refund,
    stipend,
    invoice,
    upfront,
    others
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
    labels: ["Loans", "Refund", "Stipend", "Invoice", "Upfront","Others"],
    datasets: [
      {
        data: [
            loan,
            refund,
            stipend,
            invoice,
            upfront,
            others
        ],
        backgroundColor: chartColors,
        hoverBackgroundColor: chartColors,
      },
    ],
  };
  const options: ChartOptions = {
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
  console.log("chart2", stipend);
  return (
    <div className="chart">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default chart;
