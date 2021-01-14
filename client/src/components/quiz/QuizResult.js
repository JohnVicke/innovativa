import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Button from "../../components/Button/Button";
import QuestionBody from "./QuestionBody";
import "./quiz.scss";
import {bounce} from 'react-animations';
import styled, {keyframes} from 'styled-components'
import corona from "../../assets/corona.png";

const QuizResult = ({ answers }) => {
  const history = useHistory();

  const [goToSchool, setGoToSchool] = useState(false);
  const [startAnim, setStartAnim] = useState(false);

  useEffect(() => {
    const res = answers.find((qa) => qa.a === "Ja");
    if (!res) {
      setGoToSchool(true);
    }
  }, []);

  const handleContinue = (ans) => {
    // Send to database
    console.log({ ...answers, ans });
    setStartAnim(true);
    setTimeout(() => {
      history.push("/landing");
    }, 4000);
  };

  const Bounce = styled.div`animation: 2s ${keyframes`${bounce}`} infinite`;

  // TODO: Fixa annan text beroende på vad användaren klickat i
  const getRes = () => {
    if (!goToSchool) {
      return (
        <p>
          Baserat på dina svar rekommenderar vi att du <b>stannar hemma</b> och
          inte besöker Universitetet
          <br />
          <br />
          För mer information angående Covid-19 pandemin besök{" "}
          <a href="https://www.1177.se/Vasterbotten/sjukdomar--besvar/lungor-och-luftvagar/inflammation-och-infektion-ilungor-och-luftror/om-covid-19--coronavirus/covid-19-coronavirus/">
            1177
          </a>
        </p>
      );
    }
  };

  if (startAnim) {

    return <div className="animation"><Bounce><img className="cornaPic" src={corona} alt="quiz"></img></Bounce>
    <div className="thanks">tack för din medverkan!</div></div>;
  }

  return (
    <div>
      <div className="progress">
        <section className="progress-container">
          <h1>Resultat </h1>
          {getRes()}
          <QuestionBody />
        </section>
        <section className="question-bottom">
          <div className="radio-btns"></div>
          <div className="continue-btns">
            <Button
              onClick={() => handleContinue({ goesToSchool: true })}
              outlined
            >
              Jag går till skolan ändå
            </Button>
            <Button
              onClick={() => handleContinue({ goesToSchool: false })}
              filled
            >
              Jag stannar hemma
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default QuizResult;
