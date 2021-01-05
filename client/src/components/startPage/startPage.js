import React from "react";
import NextButton from "../nextButton/nextButton";
import OnBoarding from "../onBoarding/onBoarding";
//import chart from "../../assets/chart.png"
import combat from "../../assets/combat.png"

  const startPage = () => {
    return (
      <div>
          <div className="outer">
          <img src= {combat} alt="Chart" ></img>
          <div className="text">
      <OnBoarding header="Combat Covid on Campus" bread="Vi vill göra campus till en säkrare plats, hjälp oss med det!
Om du verkligen måste till campus så se till att du gör vår checklista, ärligt!
Du kommer vara anonym så du behöver inte vara blyg.
"/>
</div>
        <div className="buttons">
        <NextButton/>
        <br/>
   
        <button className="hoppa" type="button">Hoppa över introduktionen</button>
        </div>
        </div>
        </div>
 
    );
  };
    

export default startPage;
