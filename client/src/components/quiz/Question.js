import React from "react";
import NextButton from "../nextButton/nextButton";
import Quiz from "../quiz/quiz";

import "../onBoarding/onBoarding.css"
//import chart from "../../assets/chart.png"
import combat from "../../assets/combat.png"

  const Question = () => {
    return (
      <div>
        <Quiz question="Hostig?" nr="1"/>
        <div className="buttons">
        <NextButton/>
        </div>
      </div>

    );
  };
    export default Question;