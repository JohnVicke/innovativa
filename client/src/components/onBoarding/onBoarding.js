import React from "react";
import "./onBoarding.css"
import "../nextButton/nextButton"
import NextButton from "../nextButton/nextButton";
import { useHistory } from "react-router-dom";
import Button from "../Button/Button";


const OnBoarding = ({header, bread, curr})=>{
    const history = useHistory();

    const handleContinue = () => {
        var c = Number(curr)
        if(c === 3){
            history.push('/landing')
        }
        else{
        var v = c + 1;
        history.push('/'+ v)
        }

      };

    return (
        <div>
    <div className="text">
    <h1>{header}</h1>
    <p>{bread}</p>
    </div>
    <div className="buttons">
    <Button onClick={handleContinue} disabled={false}>
                  Nästa
                </Button>
    <br/>

    <button className="hoppa" type="button">Hoppa över introduktionen</button>
    </div>
    </div>
    );
}
export default OnBoarding;