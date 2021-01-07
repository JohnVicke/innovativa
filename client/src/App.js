import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LandingPage from "./components/landingPage/landingPage";
import Quiz from "./components/quiz/Quiz";

const App = () => (
  <Router>
    {/* <Route path="/" exact component={Question}/> */}
    <Route path="/" exact component={LandingPage} />
    <Route path="/quiz" exact component={Quiz} />
  </Router>
);

export default App;
