import React from "react";
import { ReactComponent as CheckIcon } from "../../assets/check.svg";

import "./radiobtns.scss";

const RadioButton = ({ active, label, toggle }) => {
  return (
    <div className="radio-root" onClick={() => toggle(label)}>
      <div className={`radio-container ${active ? "active" : ""}`}>{active && <CheckIcon />}</div>
      <p>{label}</p>
    </div>
  );
};

export default RadioButton;
