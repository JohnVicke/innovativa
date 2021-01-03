
import React from 'react';

import startPage from './components/startPage/startPage';
//import onBoarding2 from './components/onBoarding2/onBoarding2';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => (
  <Router>
      <Route path="/" exact component={startPage}/>
  </Router>
);

export default App;
