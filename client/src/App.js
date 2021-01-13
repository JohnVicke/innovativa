import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LandingPage from "./components/landingPage/landingPage";
import Quiz from "./components/quiz/Quiz";
import onBoarding2 from "./components/startPage/onBoarding2";
import onBoarding3 from "./components/startPage/onBoarding3";
import startPage from "./components/startPage/startPage";

const App = () => (
  <Router>
    {/* <Route path="/" exact component={Question}/> */}
    <Route path="/" exact component={startPage} />
    <Route path="/quiz" exact component={Quiz} />
    <Route path="/2" exact component={onBoarding2} />
    <Route path="/3" exact component={onBoarding3} />
    <Route path="/landing" exact component={LandingPage} />

  </Router>
);

export default App;
