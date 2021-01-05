import React, { useState } from "react";
import "./quiz.scss";

import chevron from "../../assets/chevron.png";
import questions from "./questions.json";
import QuestionBody from "./QuestionBody";
import Button from "../Button/Button";
import RadioButton from "./RadioButton";
import ProgressBar from "./ProgressBar";

const Quiz = () => {
  const [currQ, setCurrQ] = useState(0);
  const [firstChoice, setFirstChoice] = useState(true);
  const [selected, setSelected] = useState([
    {
      label: "Ja",
      active: false,
    },
    {
      label: "Nej",
      active: false,
    },
  ]);

  const handleSelected = (label) => {
    if (firstChoice) {
      setSelected(selected.map((item) => (item.label === label ? { ...item, active: !item.active } : item)));
      setFirstChoice(false);
      return;
    }
    setSelected(selected.map((item) => ({ ...item, active: !item.active })));
  };

  const handleNext = () => {
    if (!(selected[0].active || selected[1].active)) return;
    if (questions[currQ + 1]) {
      setSelected(selected.map((item) => ({ ...item, active: false })));
      setFirstChoice(true);
      setCurrQ(currQ + 1);
    }
  };

  return (
    <div className="quiz-root">
      <div class="topBar">
        <img src={chevron} alt="Chart" width="auto"></img>
      </div>
      <div className="progress">
        <ProgressBar min={0} curr={currQ + 1} max={questions.length} />
      </div>
      <div className="question-root">
        <section className="question-container">
          <h1>Fråga {currQ + 1}</h1>
          <h2>{questions[currQ].header}</h2>
          <QuestionBody type={questions[currQ].body.type} content={questions[currQ].body.content} />
        </section>
        <section className="question-bottom">
          <div className="radio-btns">
            <RadioButton toggle={handleSelected} active={selected[0].active} label="Ja" />
            <RadioButton toggle={handleSelected} active={selected[1].active} label="Nej" />
          </div>
          <div className="next-btn">
            <Button onClick={handleNext} disabled={false}>
              Nästa
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};
export default Quiz;
