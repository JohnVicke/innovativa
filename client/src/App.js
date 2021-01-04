
import React from 'react';

import Question from './components/quiz/Question';
//import onBoarding2 from './components/onBoarding2/onBoarding2';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => (
  <Router>
      <Route path="/" exact component={Question}/>
  </Router>
);

export default App;
