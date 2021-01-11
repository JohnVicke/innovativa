import React from "react";
import { Chart, LineAdvan, Line, Axis, Tooltip, Legend } from "bizcharts";
import "./index.scss";

const PirGraph = ({ data, day }) => {
  // 0 -> måndag, 1 -> tidsag osv
  const parseData = ({ data }) => {
    return data[day].times;
  };

  const scale = {
    value: { max: 5 },
  };

  var yLabels = {
    0: "låg",
    2.5: "mellan",
    5: "hög",
    7.5: "varing",
    10: "nejnej",
  };

  return (
    <Chart scale={scale} className="chart" padding={[10, 20, 50, 40]} autoFit height={200} data={parseData(data)}>
      <Axis name="time" />
      <Axis
        name="pir"
        label={{
          formatter: (val) => {
            return yLabels[val];
          },
        }}
      />
      <Tooltip crosshairs={{ type: "y" }} />
      <Line style={{ lineWidth: 4 }} shape="smooth" position="time*pir" color="#F28482" />
    </Chart>
  );
};

export default PirGraph;
