import React from "react";
import "./index.scss";

const Button = ({ children, disabled, onClick }) => {
  return (
    <button disabled={disabled} className="custom-btn" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
