import React, { useState } from "react";
import "./quiz.scss";

import chevron from "../../assets/chevron.png";
import questions from "./questions.json";
import QuestionBody from "./QuestionBody";
import Button from "../Button/Button";
import RadioButton from "./RadioButton";
import ProgressBar from "./ProgressBar";
import QuizResult from "./QuizResult";
import { useHistory } from "react-router-dom";

const Quiz = () => {
  const history = useHistory();
  const [currQ, setCurrQ] = useState(0);
  const [showResult, setShowResult] = useState(false);
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

  const [answers, setAnswers] = useState([]);

  const handleSelected = (label) => {
    if (firstChoice) {
      setSelected(
        selected.map((item) =>
          item.label === label ? { ...item, active: !item.active } : item
        )
      );
      setFirstChoice(false);
      return;
    }
    setSelected(selected.map((item) => ({ ...item, active: !item.active })));
  };

  const handleNext = () => {
    const yes = selected.find((el) => el.active === true);
    setAnswers([...answers, { q: questions[currQ], a: yes.label }]);
    if (!(selected[0].active || selected[1].active)) return;
    if (questions[currQ + 1]) {
      setSelected(selected.map((item) => ({ ...item, active: false })));
      setFirstChoice(true);
      setCurrQ(currQ + 1);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="quiz-root">
      <div class="topBar">
        <img
          src={chevron}
          alt="Chart"
          width="auto"
          onClick={() => history.goBack()}
        ></img>
      </div>
      {showResult ? (
        <QuizResult answers={answers} />
      ) : (
        <>
          <div className="progress">
            <ProgressBar min={0} curr={currQ + 1} max={questions.length} />
          </div>
          <div className="question-root">
            <section className="question-container">
              <h1>Fråga {currQ + 1}</h1>
              <h2>{questions[currQ].header}</h2>
              <QuestionBody
                type={questions[currQ].body.type}
                content={questions[currQ].body.content}
              />
            </section>
            <section className="question-bottom">
              <div className="radio-btns">
                <RadioButton
                  toggle={handleSelected}
                  active={selected[0].active}
                  label="Ja"
                />
                <RadioButton
                  toggle={handleSelected}
                  active={selected[1].active}
                  label="Nej"
                />
              </div>
              <div className="next-btn">
                <Button
                  onClick={handleNext}
                  disabled={!selected[0].active && !selected[1].active}
                >
                  Nästa
                </Button>
              </div>
            </section>
          </div>
        </>
      )}
    </div>
  );
};
export default Quiz;
