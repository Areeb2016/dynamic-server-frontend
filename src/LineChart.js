import React from "react";
import { Line } from "react-chartjs-2";

const LineChart = ({ data }) => {
  return (
    <div style={{ marginTop: "30px" }}>
      <Line widt data={data} />
    </div>
  );
};

export default LineChart;
