import React from "react";
import { Chart, LineAdvance } from "bizcharts";
import "./index.scss";

const PirGraph = ({ data }) => {
  const parseData = ({ data }) => {
    return data[0].times;
  };

  const scale = {
    value: { max: 5 },
  };

  return (
    <Chart scale={scale} className="chart" padding={[10, 20, 50, 40]} autoFit height={200} data={parseData(data)}>
      <LineAdvance style={{ lineWidth: 3 }} shape="smooth" point area position="time*pir" color="#F28482" />
    </Chart>
  );
};

export default PirGraph;
