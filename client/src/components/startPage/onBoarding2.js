import React from "react";
import OnBoarding from "../onBoarding/onBoarding";
import chart from "../../assets/chart.png"

  const onBoarding2 = () => {
    return (
      <div>
          <div className="outer">
          <img src= {chart} alt="Chart"></img>
          <div className="text">
      <OnBoarding header="Smittsamma tider" bread="På startsidan finner du detta diagram,
             denna kommer att hjälpa dig se när universitet är välbesökt och inte 
             en lämplig plats att vistas på. Du kan se utifrån tid och plats hur många som vistas på Universitetet.
Watch the diagram, trust the diagram"/>
</div>

        </div>
        </div>
 
    );
  };
    

export default onBoarding2;
