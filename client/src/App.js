import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import "./App.css";

import Home from "./pages/home/Home";
import SignUp from './pages/signup/SignUp';

function App() {
  
  return (
    <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/signup" component={SignUp} />
          </Switch>
    </Router>
  );
}

export default App;
