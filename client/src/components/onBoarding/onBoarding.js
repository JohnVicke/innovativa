import React from "react";
import "./onBoarding.css"
import "../nextButton/nextButton"

const onBoarding = ({header, bread})=>(
    <div className="text">
    <h1>{header}</h1>
    <p>{bread}</p>
    </div>
    )
export default onBoarding;
