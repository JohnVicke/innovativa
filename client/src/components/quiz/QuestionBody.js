import React from "react";
import "./body.scss";

const QuestionBody = ({ type, content }) => {
  if (type === "list") {
    return (
      <div className="body-container">
        <ul>
          {content.map((el) => (
            <li>{el}</li>
          ))}
        </ul>
      </div>
    );
  }

  return <div className="body-container"></div>;
};

export default QuestionBody;
