import React from "react";
import "./quiz.css";
import chevron from "../../assets/chevron.png"



const quiz = ({nr, question})=>(



<div className="q">
<div class="topBar">
<img src= {chevron} alt="Chart" width="auto"></img>
</div>
<div class="progress">
<progress id="file" value={nr} max="10"> {nr}/10 </progress>
</div>
<div className="t">
<div>
<h2>Fråga {nr}<br/></h2>
</div>
<div class="qu"><p>{question}</p></div>
</div>
<div id="checkboxes">
  <div class="checkboxgroup">
    <input type="radio" name="radio" id="radio_1" />
    <label for="Ja">Ja</label>
  </div>
  <div class="checkboxgroup">
    <input type="radio" name="radio" id="radio_2" />
    <label for="Nej">Nej</label>
  </div>
</div>
</div>
    
    )
export default quiz;
