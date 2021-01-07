import React from "react";
import "./progress.scss";

const ProgressBar = ({ min, max, curr }) => {
  const getWidth = () => {
    if (curr <= 1) return { width: 0 };
    return { width: `${(curr / max) * 100}%` };
  };

  return (
    <div className="progress-root">
      <p>
        {curr}/{max}
      </p>
      <div className="bar">
        <div className="bar-green" style={getWidth()} />
      </div>
    </div>
  );
};

export default ProgressBar;
