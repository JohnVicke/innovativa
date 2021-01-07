import React from "react";
import "./index.scss";

const Button = ({ children, disabled, onClick, ...rest }) => {
  return (
    <button disabled={disabled} className={`custom-btn ${Object.keys(rest)[0]}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
