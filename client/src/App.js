
import React from 'react';

import Question from './components/quiz/Question';
import onBoarding2 from './components/startPage/onBoarding2';
import onBoarding3 from './components/startPage/onBoarding3';
import onBoarding1 from './components/startPage/onBoarding1';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => (
  <Router>
      <Route path="/" exact component={onBoarding2}/>
  </Router>
);

export default App;
