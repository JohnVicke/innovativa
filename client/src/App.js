
import React from 'react';

import Question from './components/quiz/Question';
import LandingPage from './components/landingPage/landingPage';
//import onBoarding2 from './components/onBoarding2/onBoarding2';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => (
  <Router>
      {/* <Route path="/" exact component={Question}/> */}
      <Route path="/" exact component={LandingPage}/>
  </Router>
);

export default App;
