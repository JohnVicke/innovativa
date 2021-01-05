import React from "react";
import "./onBoarding.css"
import "../nextButton/nextButton"
import NextButton from "../nextButton/nextButton";

const onBoarding = ({header, bread})=>{

    document.getElementsByClassName('nasta').onClick = function(){
console.log('tjan')
    }

    return (
        <div>
    <div className="text">
    <h1>{header}</h1>
    <p>{bread}</p>
    </div>
    <div className="buttons">
    <NextButton className="nasta"/>
    <br/>

    <button className="hoppa" type="button">Hoppa över introduktionen</button>
    </div>
    </div>
    );
}
export default onBoarding;
