import React, { useState } from "react";
import NextButton from "../nextButton/nextButton";
import Quiz from "../quiz/quiz";
import "../onBoarding/onBoarding.css"

import "../onBoarding/onBoarding.css"
//import chart from "../../assets/chart.png"
import combat from "../../assets/combat.png"

  const Question = () => {
    const questions=[
      {
        qText: "Känner du dig hostig?",
        aOptions: [
          {aText: "Ja", isCorrect: false},
          {aText: "Nej", isCorrect: true},

        ],

      },
      {
        qText: "Känner du dig snuvig?",
        aOptions: [
          {aText: "Ja", isCorrect: false},
          {aText: "Nej", isCorrect: true},

        ],

      },
      {
        qText: "Har du ont i halsen?",
        aOptions: [
          {aText: "Ja", isCorrect: false},
          {aText: "Nej", isCorrect: true},

        ],

      },
    ]

const [currentQuestion, setCurrentQuestion] = useState(0);
const handleNext = () => {
  const nextQ = currentQuestion +1;
  setCurrentQuestion(nextQ);

}
    return (
      <div>
        <Quiz question={questions[currentQuestion].qText} nr={currentQuestion+1}/>
        <div className="buttons">
        <button class="nasta" onClick={handleNext}> Nästa </button>
        </div>
      </div>

    );
  };
    export default Question;